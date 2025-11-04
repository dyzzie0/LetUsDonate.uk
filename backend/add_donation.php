<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

include 'db_connect.php'; 

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $user_id        = $data['user_id'] ?? null;
    $item_name      = trim($data['item_name'] ?? '');
    $category       = trim($data['category'] ?? '');
    $type           = trim($data['type'] ?? '');
    $condition      = trim($data['condition'] ?? '');
    $description    = trim($data['description'] ?? '');
    $charity_name   = trim($data['charity_name'] ?? '');

    if (!$user_id || !$item_name || !$category || !$type || !$condition || !$charity_name) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    $pdo->beginTransaction();

    // Get donor_ID
    $stmt = $pdo->prepare("SELECT donor_ID FROM Donor WHERE user_ID = ?");
    $stmt->execute([$user_id]);
    $donor = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$donor) throw new Exception("Donor account not found.");
    $donor_ID = $donor['donor_ID'];

    // Get charity_ID
    $stmt = $pdo->prepare("SELECT charity_ID FROM Charity WHERE charity_name = ?");
    $stmt->execute([$charity_name]);
    $charity = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$charity) throw new Exception("Charity not found.");
    $charity_ID = $charity['charity_ID'];

    // Insert donation
    $stmt = $pdo->prepare("
        INSERT INTO Donation (donor_ID, charity_ID, donation_status, donation_date) 
        VALUES (?, ?, ?, datetime('now'))
    ");
    $stmt->execute([$donor_ID, $charity_ID, "Pending"]);
    $donation_ID = $pdo->lastInsertId();

    // Insert donation item
    $stmt = $pdo->prepare("
        INSERT INTO Donation_Item 
        (donation_ID, item_name, item_category, item_size, item_condition, item_description) 
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $donation_ID, 
        $item_name, 
        $category, 
        $type, 
        $condition, 
        $description
    ]);

    $pdo->commit();

    echo json_encode(["status" => "success", "message" => "Donation submitted successfully!"]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
