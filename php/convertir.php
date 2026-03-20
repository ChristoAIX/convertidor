<?php

require_once __DIR__ . "/lib/manejaErrores.php";
require_once __DIR__ . "/lib/recibeEnteroObligatorio.php";
require_once __DIR__ . "/lib/recibeTextoObligatorio.php";
require_once __DIR__ . "/lib/devuelveJson.php";
require_once __DIR__ . "/lib/ProblemDetailsException.php";
require_once __DIR__ . "/../db/conexion.php";

$cantidad = recibeEnteroObligatorio("cantidad");
$origen = recibeTextoObligatorio("origen");
$destino = recibeTextoObligatorio("destino");

$respuesta = @file_get_contents("https://open.er-api.com/v6/latest/$origen");

if ($respuesta === false) {
 throw new ProblemDetailsException([
  "status" => 500,
  "title" => "Error al consultar API"
 ]);
}

$data = json_decode($respuesta);

if (!isset($data->rates->$destino)) {
 throw new ProblemDetailsException([
  "status" => 400,
  "title" => "Moneda no válida"
 ]);
}

$resultado = $cantidad * $data->rates->$destino;

$pdo = conexion();

$pdo->prepare(
 "INSERT INTO conversiones (cantidad, origen, destino, resultado)
  VALUES (?, ?, ?, ?)"
)->execute([$cantidad, $origen, $destino, $resultado]);

devuelveJson([
 "resultado" => $resultado
]);