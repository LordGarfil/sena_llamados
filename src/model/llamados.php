<?php

class Llamados
{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }

  function getLlamadosEstudiante($personaId)
  {
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

    $res = $this->db->fetch($sql, [$personaId]);
    answer_json($res);
  }

  function getLlamadosDocente($data)
  {
    $personaId = isset($data['persona_id']) ? $data['persona_id'] : null;
    $materiaId = isset($data['materia_id']) ? $data['materia_id'] : null;

    if ($personaId) {
      if (!$materiaId) {
        $sql = "SELECT p.id estudiante_id,
       concat(p.nombre, ' ', p.apellido) estudiante,
       p.correo,
       count(*) llamados
      FROM llamados l
      INNER JOIN personas p ON l.persona_id = p.id
      WHERE l.docente_id = ?";

        $res = $this->db->fetch($sql, [$personaId]);
      } else {
        $sql = "SELECT p.id estudiante_id,
        concat(p.nombre, ' ', p.apellido) estudiante,
        p.correo,
        count(*) llamados
        FROM llamados l
        INNER JOIN personas p ON l.persona_id = p.id
        WHERE l.docente_id = ?
      and l.materia_id = ?";

        $res = $this->db->fetch($sql, [$personaId, $materiaId]);
      }
    }

    answer_json($res);
  }

  function createLlamados($data = [])
  {
    $res = $this->db->insert('llamados', $data);
    answer_json($res);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $l = new Llamados();
  switch ($_GET['filter']) {
    case '1':
      $l->getLlamadosEstudiante($_GET['persona_id']);
      break;

    case '2':
      $l->getLlamadosDocente($_GET);
      break;
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $l = new Llamados();
  $l->createLlamados($_POST);
}
