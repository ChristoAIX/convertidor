<?php

require_once __DIR__ . "/lib/manejaErrores.php";
require_once __DIR__ . "/lib/devuelveJson.php";
require_once __DIR__ . "/../db/conexion.php";

$pdo = conexion();

$resultado = $pdo
 ->query("SELECT * FROM conversiones ORDER BY id DESC")
 ->fetchAll();

devuelveJson($resultado);