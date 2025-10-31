<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include __DIR__ . '/db_connect.php';

try {
    $stmt = $pdo->query("SELECT charity_ID, charity_name FROM Charity ORDER BY charity_name ASC");
    $charities = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "charities" => $charities
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
