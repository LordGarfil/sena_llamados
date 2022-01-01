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
  <form id="main-form" class="app">
    <h5>¡Bienvenido!</h5>
    <div class="login-form">
      <input class="textfield" type="text" placeholder="Usuario" name="user" autocomplete="false" autocapitalize="false">
      <input class="textfield" type="password" placeholder="Contraseña" name="password" autocomplete=false autocapitalize=false>
      <input class="button" type="submit" value="Iniciar sesión">
    </div>
  </form>
  <script src="./src/controller/login.js" type="module"></script>
</body>

</html>