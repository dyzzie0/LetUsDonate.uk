<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

include 'db_connect.php';

try {
    // Use $_POST for FormData
    $user_id      = $_POST['user_id'] ?? null;
    $item_name    = trim($_POST['item_name'] ?? '');
    $category     = trim($_POST['category'] ?? '');
    $type         = trim($_POST['type'] ?? '');
    $condition    = trim($_POST['condition'] ?? '');
    $description  = trim($_POST['description'] ?? '');
    $charity_name = trim($_POST['charity_name'] ?? '');

    if (!$user_id || !$item_name || !$category || !$type || !$condition || !$charity_name) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit;
    }

    // Handle file upload
    $image_path = null;
    if (isset($_FILES['item_image']) && $_FILES['item_image']['error'] === UPLOAD_ERR_OK) {
        $uploads_dir = __DIR__ . '/uploads';
        if (!is_dir($uploads_dir)) mkdir($uploads_dir, 0777, true);

        $tmp_name = $_FILES['item_image']['tmp_name'];
        $name = basename($_FILES['item_image']['name']);
        $target_file = $uploads_dir . '/' . uniqid() . '_' . $name;

        if (move_uploaded_file($tmp_name, $target_file)) {
            $image_path = 'uploads/' . basename($target_file); // relative path to store in DB
        }
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
        (donation_ID, item_name, item_category, item_size, item_condition, item_description, item_image) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $donation_ID,
        $item_name,
        $category,
        $type,
        $condition,
        $description,
        $image_path
    ]);

    $pdo->commit();

    echo json_encode(["status" => "success", "message" => "Donation submitted successfully!"]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
