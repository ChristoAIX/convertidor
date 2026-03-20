<?php
require_once __DIR__ . "/recibeTexto.php";

function recibeEntero(string $parametro): false|null|int
{
 $valor = recibeTexto($parametro);

 if ($valor === false) {
  return false;
 } else {
  $valor = trim($valor);

  if ($valor === "") {
   return null;
  } else {
   return (int) $valor;
  }
 }
}