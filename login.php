<?php

include "./db/db_handle.php";
//Validación de campos vacios

if ($_POST) {
  if (
    trim($_POST['user'])   === ''
    || trim($_POST['password'])     === ''
  ) {
    echo "Debe llenar todos los campos";
  } else {
    $result = validate_user_existences($_POST);
    if (!$result) {
      echo "Usuario no existe";
    } else {
      echo "Usuario logueado correctamente";
      header("location:index.php");
    }
  }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>Inicio de sesión</title>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/login.css">
</head>

<body>
  <form action="login.php" method="POST">
    <h5>¡Bienvenido!</h5>
    <div class="login-form">
      <input class="textfield" type="text" value="" placeholder="Usuario" name="user" autocomplete="false" autocapitalize="false">
      <br>
      <input class="textfield" type="text" value="" placeholder="Contraseña" name="password" autocomplete="false" autocapitalize="false">
      <br>
      <input class="button" type="submit" value="Iniciar sesión">
    </div>
  </form>
</body>

</html>