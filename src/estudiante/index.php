<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../styles/students.css">
  <title>Llamados de atención</title>
</head>

<body>
  <!-- Cargando contenido -->
  <div class="center_loader">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

  <!-- nav bar del contenido -->
  <header>
    <div class="header-content">
      <div class="sena">
        <h1>Sena</h1>
      </div>
      <div class="student-data">
        <div class="ficha">
          <h1>2056419</h1>
        </div>
        <b>|</b>
        <div class="student-name">
          <a href="">
            Jean Carlos Quejada Toro
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- Contenido de la tabla -->
  <div class="body-content invisible">
    <div class="content">
      <div class="route">
        <h1>Estudiante > Llamados de atención</h1>
      </div>
      <div class="table"></div>
    </div>

  </div>

  <script>
    const person_information = <?php echo (json_encode($_SESSION));  ?>
  </script>
</body>
<script src="../controller/students.js"></script>

</html>