<?php

function getEstudiantes($materiaId){
  require_once("db.php");
  require_once("../functions.php");

  $sql = "SELECT concat(p.nombre, ' ', p.apellido) nombre, p.correo, p.id
    FROM personas p
    inner join personas_materias pm on p.id = pm.persona_id
    inner join usuarios u on p.id = u.persona_id
    WHERE pm.materia_id = ? and u.rol_id = 1";
 
  $res = fetch($sql, [$materiaId]);
  answer_json($res);
}


if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  getEstudiantes($_GET['materia_id']);
}