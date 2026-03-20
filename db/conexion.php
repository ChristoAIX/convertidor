<?php

function conexion()
{
 return new PDO(
  "mysql:host=sql313.infinityfree.com;dbname=if0_40979192_divisas;charset=utf8",
  "if0_40979192",
  "e2uXBXml9yAuWVm",
  [
   PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
   PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  ]
 );
}