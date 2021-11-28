<?php
session_start();
$userId = $_SESSION["user"];
$role = $_SESSION["role"] == 1 ? "estudiante" : "profesor";
echo "Hola $role  $userId";
