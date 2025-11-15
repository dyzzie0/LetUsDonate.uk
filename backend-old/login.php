<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

include 'db_connect.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if (!$email || !$password) {
        echo json_encode(["status" => "error", "message" => "Email and password are required"]);
        exit;
    }

    // Get user by email
    $stmt = $pdo->prepare("SELECT user_ID, user_name, user_email, user_password, role_id FROM User WHERE user_email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
        exit;
    }

    // Verify password
    if (!password_verify($password, $user['user_password'])) {
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
        exit;
    }

    // Get role name
    $stmt = $pdo->prepare("SELECT role_name FROM Role WHERE role_ID = ?");
    $stmt->execute([$user['role_id']]);
    $role = $stmt->fetchColumn() ?? 'donor';

    // Determine redirect based on role
    $redirect = '/user_dashboard'; 
    if ($user['role_id'] == 12) {
        $redirect = '/admin_dashboard';
    } elseif ($user['role_id'] == 11) {
        $redirect = '/charity_dashboard';
    }

    // Return user info with redirect
    echo json_encode([
        "status" => "success",
        "user" => [
            "id" => $user['user_ID'],
            "name" => $user['user_name'],
            "email" => $user['user_email'],
            "role" => strtolower($role)
        ],
        "redirect" => $redirect
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
