<?php

function getLlamadosEstudiante($personaId){
  require_once("db.php");
  require_once("../functions.php");

  $sql = "SELECT l.id llamado_id,
       r.id regla_id,
       r.nombre regla,
       m.nombre materia,
       concat(d.nombre, ' ', d.apellido) docente,
       l.observacion observaciones,
       c.nombre categoria,
       c.color,
       l.fecha_creacion fecha
      FROM llamados l
      INNER JOIN personas p ON l.persona_id = p.id
      INNER JOIN personas d ON l.docente_id = d.id
      INNER JOIN reglas r ON l.regla_id = r.id
      INNER JOIN materias m ON l.materia_id = m.id
      INNER JOIN categorias c ON r.categoria_id = c.id
      WHERE l.persona_id = ?";
 
  $res = fetchOne($sql, [$personaId]);
  answer_json($res);
}

function getLlamadosDocente(){
  
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  switch($_GET['filter']){
    case '1':
      getLlamadosEstudiante($_GET['persona_id']);
      break;
  }
}