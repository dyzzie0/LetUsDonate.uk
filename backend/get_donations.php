<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include __DIR__ . '/db_connect.php';

$user_id = $_GET["user_id"] ?? null;

if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "Missing user ID"]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            d.donation_ID,
            di.item_name,
            di.item_category,
            di.item_condition,
            c.charity_name,
            d.donation_status,
            d.donation_date,
            di.pickup_address
        FROM Donation d
        JOIN Donation_Item di ON d.donation_ID = di.donation_ID
        JOIN Charity c ON d.charity_ID = c.charity_ID
        JOIN Donor dn ON d.donor_ID = dn.donor_ID
        WHERE dn.user_ID = ?
        ORDER BY d.donation_date DESC
    ");
    $stmt->execute([$user_id]);
    $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "donations" => $donations]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
