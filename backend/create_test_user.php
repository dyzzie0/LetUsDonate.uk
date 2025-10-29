<?php
include 'db_connect.php';

$name = "Test User";
$email = "test@example.com";
$password = password_hash("test123", PASSWORD_DEFAULT);
$role = "donor";

try {
    $stmt = $db->prepare("INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $password, $role]);
    echo "✅ Test user created successfully!";
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
