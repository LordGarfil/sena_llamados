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
 
  $res = fetch($sql, [$personaId]);
  answer_json($res);
}

function getLlamadosDocente($data){
  require_once("db.php");
  require_once("../functions.php");

  $personaId = isset($data['persona_id']) ? $data['persona_id'] : null;
  $materiaId = isset($data['materia_id']) ? $data['materia_id'] : null;

  if($personaId){
    if(!$materiaId){
    $sql = "SELECT p.id estudiante_id,
       concat(p.nombre, ' ', p.apellido) estudiante,
       p.correo,
       count(*) llamados
      FROM llamados l
      INNER JOIN personas p ON l.persona_id = p.id
      WHERE l.docente_id = ?";

      $res = fetch($sql, [$personaId]);
  }else{
    $sql = "SELECT p.id estudiante_id,
        concat(p.nombre, ' ', p.apellido) estudiante,
        p.correo,
        count(*) llamados
        FROM llamados l
        INNER JOIN personas p ON l.persona_id = p.id
        WHERE l.docente_id = ?
      and l.materia_id = ?";

      $res = fetch($sql, [$personaId, $materiaId]);
  }
  }

  answer_json($res);
}

function createLlamados($data = []){
  require_once("db.php");
  require_once("mail.php");
  require_once("../functions.php");

  $res = insert('llamados', $data);
  sendMail($data);
  answer_json($res);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  switch($_GET['filter']){
    case '1':
      getLlamadosEstudiante($_GET['persona_id']);
      break;

    case '2':
      getLlamadosDocente($_GET);
      break;
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  // $data = $_POST ? $_POST : file_get_contents("php://input");
  createLlamados($_POST);
}