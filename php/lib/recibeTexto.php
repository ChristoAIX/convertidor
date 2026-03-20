<?php

function recibeTexto(string $parametro): false|string
{
 return isset($_REQUEST[$parametro])
  ? $_REQUEST[$parametro]
  : false;
}