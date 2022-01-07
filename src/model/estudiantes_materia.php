<?php

class Estudiantes_materia
{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }
  function getEstudiantes($materiaId)
  {
    $sql = "SELECT concat(p.nombre, ' ', p.apellido) nombre, p.correo, p.id
    FROM personas p
    inner join personas_materias pm on p.id = pm.persona_id
    inner join usuarios u on p.id = u.persona_id
    WHERE pm.materia_id = ? and u.rol_id = 1";

    $res = $this->db->fetch($sql, [$materiaId]);
    answer_json($res);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $em = new Estudiantes_materia();
  $em->getEstudiantes($_GET['materia_id']);
}
