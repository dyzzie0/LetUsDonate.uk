<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

$data = json_decode(file_get_contents("php://input"), true);

$users = [
    'donor@test.com' => ['name'=>'Test Donor','password'=>'123456','role'=>'donor'],
    'charity@test.com' => ['name'=>'Test Charity','password'=>'123456','role'=>'charity'],
    'admin@test.com' => ['name'=>'Test Admin','password'=>'123456','role'=>'admin']
];

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if(isset($users[$email]) && $users[$email]['password'] === $password){
    echo json_encode(['status'=>'success','user'=>['email'=>$email]+$users[$email]]);
} else {
    echo json_encode(['status'=>'error','message'=>'Invalid email or password']);
}
?>
