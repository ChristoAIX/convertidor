<?php

function conexion()
{
    return new PDO(
        "mysql:host=localhost;dbname=u615613070_Divisas;charset=utf8",
        "u615613070_Ismael",
        "0574Ismael",
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
}