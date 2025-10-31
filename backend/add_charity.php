<?php
include 'db_connect.php';

$charity_name = "Test Charity";
$charity_address = "123 Test Street, London, UK";
$charity_email = "info@testcharity.org";
$contact_person = "John Doe";

try {
    $stmt = $pdo->prepare("
        INSERT INTO Charity (charity_name, charity_address, charity_email, contact_person)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([$charity_name, $charity_address, $charity_email, $contact_person]);
    echo json_encode(["status" => "success", "message" => "Charity added"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
