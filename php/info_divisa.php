<?php
header("Content-Type: application/json");


$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$moneda = $data["moneda"] ?? "";

echo json_encode([
    "moneda" => $moneda
]);