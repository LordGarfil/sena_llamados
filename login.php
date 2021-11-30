<!DOCTYPE html>
<html lang="en">

<head>
  <title>Inicio de sesión</title>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="app.css">
</head>

<body>
  <form>
    <h5>¡Bienvenido!</h5>
    <div class="login-form">
      <input class="textfield" type="text" value="" placeholder="Usuario" id="user" autocomplete=false autocapitalize="false">
      <br>
      <input class="textfield" type="text" value="" placeholder="Contraseña" id="password" autocomplete=false autocapitalize="false">
      <br>
      <input class="button" type="submit" value="Iniciar sesión">
    </div>
  </form>
  <script src="./src/controller/login.js"></script>
</body>

</html>