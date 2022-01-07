<?php

class Estudiante
{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }

  function createEstudiante($data = [])
  {
    //Se crea la persona
    $persona = $data;
    if (isset($data['ficha'])) {
      unset($persona['ficha']);
    }
    // answer_json($data);
    $this->db->insert('personas', $persona);

    //Se crea el usuario
    $usuario = [
      "persona_id" => $data['id'],
      "contrasena" => "123",
      "rol_id" => 1
    ];
    $this->db->insert('usuarios', $usuario);

    //Se asocia a la persona con la ficha
    $persona_ficha = [
      "ficha_id" => $data['ficha'],
      "persona_id" => $data['id']
    ];
    $this->db->insert('personas_fichas', $persona_ficha);

    // answer_json($res);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // $data = $_POST ? $_POST : file_get_contents("php://input");
  $e = new Estudiante();
  $e->createEstudiante($_POST);
}
