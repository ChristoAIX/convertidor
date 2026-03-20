<?php

require_once __DIR__ . "/lib/manejaErrores.php";
require_once __DIR__ . "/lib/recibeEnteroObligatorio.php";
require_once __DIR__ . "/lib/devuelveJson.php";
require_once __DIR__ . "/../db/conexion.php";

$id = recibeEnteroObligatorio("id");

$pdo = conexion();

$pdo->prepare("DELETE FROM conversiones WHERE id = ?")
 ->execute([$id]);

devuelveJson([
 "mensaje" => "ok"
]);