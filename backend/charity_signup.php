<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connect.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $charityName = trim($data['charityName'] ?? '');
    $charityEmail = trim($data['email'] ?? '');
    $charityAddress = trim($data['address'] ?? '');
    $contactPerson = trim($data['contactPerson'] ?? '');
    $password = trim($data['password'] ?? '');

    if (!$charityName || !$charityEmail || !$charityAddress || !$contactPerson || !$password) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    $stmt = $db->prepare("SELECT * FROM User WHERE user_email = ?");
    $stmt->execute([$charityEmail]);
    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Email already registered."]);
        exit;
    }

    $roleStmt = $db->prepare("SELECT role_ID FROM Role WHERE role_name = 'charity'");
    $roleStmt->execute();
    $role = $roleStmt->fetchColumn();
    if (!$role) {
        echo json_encode(["status" => "error", "message" => "Role not found in database"]);
        exit;
    }

    $hashed_pw = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $db->prepare("INSERT INTO User (user_Fname, user_Lname, user_email, user_password, role_id)
                          VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$contactPerson, '', $charityEmail, $hashed_pw, $role]);
    $userId = $db->lastInsertId();

    $stmt = $db->prepare("INSERT INTO Charity (charity_name, charity_address, charity_email, contact_person)
                          VALUES (?, ?, ?, ?)");
    $stmt->execute([$charityName, $charityAddress, $charityEmail, $contactPerson]);

    echo json_encode(["status" => "success", "message" => "Charity registered successfully!", "redirect" => "/charity-dashboard"]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
