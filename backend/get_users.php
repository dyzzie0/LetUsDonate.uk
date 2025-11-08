<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include __DIR__ . '/db_connect.php';

try {
    $stmt = $pdo->query("
        SELECT 
            u.user_ID,
            u.user_name,
            u.user_email,
            r.role_name
        FROM User u
        JOIN Role r ON u.role_id = r.role_ID
        ORDER BY u.user_ID ASC
    ");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "users" => $users]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
