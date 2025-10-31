<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include __DIR__ . '/db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
    exit;
}

$user_id        = $data["user_id"] ?? null;
$item_name      = $data["item_name"] ?? "";
$category       = $data["category"] ?? "";
$type           = $data["type"] ?? "";
$condition      = $data["condition"] ?? "";
$description    = $data["description"] ?? "";
$pickup_address = $data["pickup_address"] ?? "";
$pickup_time    = $data["pickup_time"] ?? "";
$charity_name   = $data["charity_name"] ?? "";

if (!$user_id || !$item_name || !$category || !$condition || !$charity_name) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("SELECT donor_ID FROM Donor WHERE donor_ID = ?");
    $stmt->execute([$user_id]);
    $donor = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$donor) {
        throw new Exception("Donor account not found.");
    }
    $donor_ID = $donor["donor_ID"];

    $stmt = $pdo->prepare("SELECT charity_ID FROM Charity WHERE charity_name = ?");
    $stmt->execute([$charity_name]);
    $charity = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$charity) {
        throw new Exception("Charity not found in database.");
    }
    $charity_ID = $charity["charity_ID"];

    $stmt = $pdo->prepare("
        INSERT INTO Donation (donor_ID, charity_ID, donation_status, donation_date)
        VALUES (?, ?, ?, datetime('now'))
    ");
    $stmt->execute([$donor_ID, $charity_ID, "Pending"]);
    $donation_ID = $pdo->lastInsertId();

    $stmt = $pdo->prepare("
        INSERT INTO Donation_Item
        (donation_ID, item_name, item_category, item_size, item_condition, description, pickup_address, pickup_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$donation_ID, $item_name, $category, $type, $condition, $description, $pickup_address, $pickup_time]);

    $pdo->commit();

    echo json_encode(["status" => "success", "message" => "Donation submitted successfully!"]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
