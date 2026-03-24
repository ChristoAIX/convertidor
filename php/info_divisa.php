<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$moneda = $data["moneda"] ?? "";

echo json_encode([
    "moneda" => $moneda
]);