<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
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
        <div class="ficha"></div>
        <b>|</b>
        <div class="student-name"></div>
        <i class="fas fa-sign-out" id="logout"></i>
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

  <!-- modal de datos del usuario -->
  <div class="student-modal" id="student-modal">
    <div class="modal-header">
      <button onclick="hideModal()" class="close-button">&times;</button>
      <div class="title">Información</div>
    </div>
    <div class="modal-body"></div>
  </div>
  <div id="overlay"></div>


  <!-- modal de llamado de atención -->
  <div class="call-modal" id="call-modal">
    <div class="call-modal-header"></div>
    <div class="call-modal-body"></div>
  </div>
  <div id="call-overlay"></div>

  <script>
    const person_information = <?php echo (json_encode($_SESSION));  ?>
  </script>
</body>
<script src="../controller/students.js"></script>
<script src="../controller/app.js"></script>

</html>