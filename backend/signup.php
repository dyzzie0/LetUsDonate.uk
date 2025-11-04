<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db_connect.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $name     = trim($data['fullName'] ?? '');
    $email    = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if (!$name || !$email || !$password) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM User WHERE user_email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Email already registered."]);
        exit;
    }

    $roleStmt = $pdo->prepare("SELECT role_ID FROM Role WHERE role_name = 'donor'");
    $roleStmt->execute();
    $role = $roleStmt->fetchColumn();

    if (!$role) {
        echo json_encode(["status" => "error", "message" => "Role not found in database."]);
        exit;
    }

    $hashed_pw = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("
        INSERT INTO User (user_name, user_email, user_password, role_id)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$name, $email, $hashed_pw, $role]);

    $userId = $pdo->lastInsertId();

    $stmt = $pdo->prepare("INSERT INTO Donor (user_ID) VALUES (?)");
    $stmt->execute([$userId]);

    echo json_encode([
        "status" => "success",
        "message" => "Account created successfully!",
        "userId" => $userId
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
