<?php
header("Content-Type: application/json");

$target_dir = "uploads/";
if (!is_dir($target_dir)) mkdir($target_dir, 0777, true);

$target_file = $target_dir . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
  echo json_encode(["status" => "success", "url" => $target_file]);
} else {
  echo json_encode(["status" => "error", "message" => "Failed to upload photo"]);
}
?>
