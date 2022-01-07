<?php

class Materias_personas
{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }
  function getMaterias($personaId)
  {
    $sql = "SELECT m.id materia_id,
       m.nombre materia
        FROM materias m
        INNER JOIN personas_materias pm ON m.id = pm.materia_id
        WHERE pm.persona_id = ?
        order by materia";

    $res = $this->db->fetch($sql, [$personaId]);
    answer_json($res);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $mp = new Materias_personas();
  $mp->getMaterias($_GET['persona_id']);
}
