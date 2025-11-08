<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include __DIR__ . '/db_connect.php';

$user_id = $_GET["user_id"] ?? null;

try {
    if ($user_id) {
        // User-specific donations
        $stmt = $pdo->prepare("
            SELECT 
                d.donation_ID,
                di.item_name,
                di.item_category,
                di.item_condition,
                di.item_description,
                di.item_image,          -- Add this
                c.charity_name,
                d.donation_status,
                d.donation_date
            FROM Donation d
            JOIN Donation_Item di ON d.donation_ID = di.donation_ID
            JOIN Charity c ON d.charity_ID = c.charity_ID
            JOIN Donor don ON d.donor_ID = don.donor_ID
            JOIN User u ON don.user_ID = u.user_ID
            WHERE u.user_ID = ?
            ORDER BY d.donation_date DESC
        ");
        $stmt->execute([$user_id]);
    } else {
        // Admin view — all donations (with donor names)
        $stmt = $pdo->query("
            SELECT 
                d.donation_ID,
                di.item_name,
                di.item_category,
                di.item_condition,
                di.item_description,
                di.item_image,         -- Add this
                u.user_name AS donor_name,
                c.charity_name,
                d.donation_status,
                d.donation_date
            FROM Donation d
            JOIN Donation_Item di ON d.donation_ID = di.donation_ID
            JOIN Donor don ON d.donor_ID = don.donor_ID
            JOIN User u ON don.user_ID = u.user_ID
            JOIN Charity c ON d.charity_ID = c.charity_ID
            ORDER BY d.donation_date DESC
        ");
    }

    $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "donations" => $donations]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
