<?php
 session_start(); 
 $userData = isset($_SESSION) ? $_SESSION : (object)[];
 ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../styles/docente.css">
  <link rel="stylesheet" href="../../app.css">
  <title>Profesor</title>
</head>
<body>
  <div class="app">
    <div class="header">
      <div><strong>Sena</strong></div>
      <div class="info">
        <select name="" id="selectMaterias" class="transparent-bg"></select>
        |
        <span id="nombrePesona"></span>
      </div>
    </div>
    <div class="container">
      <div class="body-header">
        <div class="info">
          <span>Profesor > Llamados</span>
        </div>
        <div class="actions">
          <button class="button-primary">Agregar</button>
        </div>
      </div>
      <div class="div-table">
      </div>
    </div>
    </div>
  </div>

  <script> 
    const userData = <?php echo(json_encode($userData)); ?>
  </script>
  <script src="../controller/docente.js"></script>
</body>
</html>