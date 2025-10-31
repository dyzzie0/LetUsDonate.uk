<?php
try {
    $dbPath = __DIR__ . '/database/Clothing_Donations.db';
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]));
}
?>
