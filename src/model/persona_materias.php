<?php

function getMaterias($personaId){
  require_once("db.php");
  require_once("../functions.php");

  $sql = "SELECT m.id materia_id,
       m.nombre materia
        FROM materias m
        INNER JOIN personas_materias pm ON m.id = pm.materia_id
        WHERE pm.persona_id = ?";
 
  $res = fetchOne($sql, [$personaId]);
  answer_json($res);
}


if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  getMaterias($_GET['persona_id']);
}