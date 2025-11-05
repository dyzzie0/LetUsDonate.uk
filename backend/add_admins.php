<?php
include 'db_connect.php';

$name     = "Test Admin";
$email    = "testadmin@example.com";
$password = "Password123"; 
$role_id  = 12; 

try {
    $hashed_pw = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("
        INSERT INTO User (user_name, user_email, user_password, role_id)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$name, $email, $hashed_pw, $role_id]);

    $userId = $pdo->lastInsertId();

    echo "Test admin added successfully with User ID: $userId";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
