<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db_connect.php'; // uses $pdo

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $charity_name = trim($data['charity_name'] ?? '');
    $charity_address = trim($data['charity_address'] ?? '');
    $charity_email = trim($data['charity_email'] ?? '');
    $contact_person = trim($data['contact_person'] ?? '');
    $password = trim($data['password'] ?? 'charity123');

    // Validate input
    if (!$charity_name || !$charity_address || !$charity_email || !$contact_person) {
        echo json_encode([
            "status" => "error",
            "message" => "All fields are required."
        ]);
        exit;
    }

    // Check if charity already exists
    $checkCharity = $pdo->prepare("SELECT 1 FROM Charity WHERE charity_email = ?");
    $checkCharity->execute([$charity_email]);
    if ($checkCharity->fetch()) {
        echo json_encode([
            "status" => "error",
            "message" => "A charity with this email already exists."
        ]);
        exit;
    }

    // Check if user already exists
    $checkUser = $pdo->prepare("SELECT 1 FROM User WHERE user_email = ?");
    $checkUser->execute([$charity_email]);
    if ($checkUser->fetch()) {
        echo json_encode([
            "status" => "error",
            "message" => "A user with this email already exists."
        ]);
        exit;
    }

    // Start transaction
    $pdo->beginTransaction();

    // Insert into Charity table
    $stmtCharity = $pdo->prepare("
        INSERT INTO Charity (charity_name, charity_address, charity_email, contact_person)
        VALUES (?, ?, ?, ?)
    ");
    $stmtCharity->execute([$charity_name, $charity_address, $charity_email, $contact_person]);
    $charity_id = $pdo->lastInsertId();

    // Insert charity admin into User table
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $role_id = 11; // Charity admin role

    $stmtUser = $pdo->prepare("
        INSERT INTO User (user_name, user_email, user_password, role_id)
        VALUES (?, ?, ?, ?)
    ");
    $stmtUser->execute([$contact_person, $charity_email, $hashed_password, $role_id]);

    // Commit transaction
    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Charity and linked admin account created successfully!"
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
