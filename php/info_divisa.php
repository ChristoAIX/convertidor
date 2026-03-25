<?php
header("Content-Type: application/json");

// 🔹 Leer JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// 🔴 Validar que sea JSON válido
if (!$data) {
 http_response_code(400);
 echo json_encode([
  "error" => "JSON inválido"
 ]);
 exit;
}

// 🔴 Validar campo requerido
if (!isset($data["moneda"]) || trim($data["moneda"]) === "") {
 http_response_code(400);
 echo json_encode([
  "error" => "La moneda es obligatoria"
 ]);
 exit;
}

// 🔹 Sanitizar
$moneda = strtoupper(trim($data["moneda"]));

// 🔹 Respuesta JSON
echo json_encode([
 "moneda" => $moneda
]);