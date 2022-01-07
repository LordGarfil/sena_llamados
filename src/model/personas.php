<?php

class Personas{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }
  function getPersona($id = null)
{
  $sql = "SELECT p.id personaId, concat(p.nombre, ' ', p.apellido) nombre,
       p.correo
      from personas p
      where p.id = ?";
 
  $res = $this->db->fetchOne($sql, [$id]);
  answer_json($res);
}

function createPersona($data = []){
  require("usuarios.php");

  // $persona = insert('personas', $data);
  // $personaData = ["usuario_id" => $persona['id'], "contrasena" => "123"];
  $personaData = ["persona_id" => '123456789', "contrasena" => "123", "rol_id" => 1];
  $usuario = createUsuario($personaData);
  answer_json($personaData);
}
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  $p = new Personas();
  $p->getPersona($_GET['id']);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $p = new Personas();
  $p->createPersona($_POST);
}
