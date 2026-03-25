<?php

require_once __DIR__ . "/../lib/manejaErrores.php";
require_once __DIR__ . "/../lib/devuelveJson.php";
require_once __DIR__ . "/../lib/ProblemDetailsException.php";
require_once __DIR__ . "/../lib/recibeTextoObligatorio.php";

$moneda = recibeTextoObligatorio("moneda");

$moneda = strtoupper(trim($moneda));

devuelveJson([
 "moneda" => $moneda
]);