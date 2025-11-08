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

    $charity_name = trim($data['charity_name'] ?? '');
    $charity_address = trim($data['charity_address'] ?? '');
    $charity_email = trim($data['charity_email'] ?? '');
    $contact_person = trim($data['contact_person'] ?? '');

    // Validate input
    if (!$charity_name || !$charity_address || !$charity_email || !$contact_person) {
        echo json_encode([
            "status" => "error",
            "message" => "All fields are required."
        ]);
        exit;
    }

    // Check if charity already exists
    $check = $db->prepare("SELECT * FROM Charity WHERE charity_email = ?");
    $check->execute([$charity_email]);
    if ($check->fetch()) {
        echo json_encode([
            "status" => "error",
            "message" => "A charity with this email already exists."
        ]);
        exit;
    }

    // Insert into database
    $stmt = $db->prepare("
        INSERT INTO Charity (charity_name, charity_address, charity_email, contact_person)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$charity_name, $charity_address, $charity_email, $contact_person]);

    echo json_encode([
        "status" => "success",
        "message" => "✅ Charity added successfully!"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
