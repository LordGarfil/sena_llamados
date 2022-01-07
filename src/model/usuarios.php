<?php

class Usuarios
{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }
  function getUsuario($id)
  {
    $sql = "SELECT persona_id
      from usuarios u
      where u.persona_id = ?";

    $res = $this->db->fetchOne($sql, [$id]);
    answer_json($res);
  }

  function createUsuario($data)
  {
    $res = $this->db->insert('usuarios', $data);
    answer_json($res);
    return $res;
  }

  function createEstudiante($data)
  {
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $u = new Usuarios();
  $u->getUsuario($_GET['id']);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // createPersona(file_get_contents("php://input"));
}
