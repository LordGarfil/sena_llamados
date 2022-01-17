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
    $userRes = $this->db->insert('usuarios', $usuario);

    //Se asocia a la persona con la ficha
    $persona_ficha = [
      "ficha_id" => $data['ficha'],
      "persona_id" => $data['id']
    ];
    $this->db->insert('personas_fichas', $persona_ficha);

    $sql = "select m.id
      from materias m
      inner join fichas_materias fm on m.id = fm.materia_id
      where fm.ficha_id = ?";

      $materias_ficha = $this->db->fetch($sql, [$data['ficha']]);
      if($materias_ficha){
        foreach($materias_ficha as $materia){
          $datos = [
            "persona_id" => $data['id'],
            "materia_id" => $materia['id']
          ];
          $this->db->insert("personas_materias", $datos);
        }
      }

    answer_json($userRes);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // $data = $_POST ? $_POST : file_get_contents("php://input");
  $e = new Estudiante();
  $e->createEstudiante($_POST);
}
