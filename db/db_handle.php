<?php

function connect()
{
  $host = "localhost";
  $user = "root";
  $password = "";
  $dbName = "sena_llamado";
  $connection  = mysqli_connect($host, $user, $password, $dbName);
  mysqli_select_db($connection, $dbName);
  return $connection;
}

function validate_user_existences($post)
{
  $user  = $post["user"];
  $password  = sha1($post["password"]);
  $connection = connect();
  $query = "SELECT p.rol_id FROM usuarios u, personas p WHERE u.persona_id = '$user' AND u.contrasena = '$password' AND p.id = '$user'";
  $result = mysqli_query($connection, $query);
  $data = mysqli_fetch_assoc($result);
  // var_dump($data);
  if ($data != null) {
    session_start();
    $_SESSION["user"] = $user;
    $_SESSION["role"] = $data["rol_id"];
    return true;
  }
  return false;
}
