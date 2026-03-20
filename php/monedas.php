<?php

require_once __DIR__ . "/lib/manejaErrores.php";
require_once __DIR__ . "/lib/devuelveJson.php";
require_once __DIR__ . "/lib/ProblemDetailsException.php";

$respuesta = @file_get_contents("https://open.er-api.com/v6/latest/USD");

if ($respuesta === false) {
 throw new ProblemDetailsException([
  "status" => 500,
  "title" => "Error al obtener monedas"
 ]);
}

$data = json_decode($respuesta);

$monedas = array_keys((array)$data->rates);

devuelveJson($monedas);