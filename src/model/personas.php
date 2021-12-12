<?php


function getPersona($id = null)
{
  require_once("db.php");
  require_once("../functions.php");

  $sql = "SELECT p.id personaId, concat(p.nombre, ' ', p.apellido) nombre,
       p.correo, r.id rolId, r.nombre rol
      from personas p
      inner join roles r on p.rol_id = r.id
      where p.id = ?";
 
  $res = fetchOne($sql, [$id]);
  answer_json($res);
}

function createPersona($data = []){
  require_once("db.php");
  require_once("usuarios.php");
  require_once("../functions.php");

  // $persona = insert('personas', $data);
  // $personaData = ["usuario_id" => $persona['id'], "contrasena" => "123"];
  $personaData = ["persona_id" => '123456789', "contrasena" => "123", "rol_id" => 1];
  $usuario = createUsuario($personaData);
  answer_json($personaData);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  getPersona($_GET['id']);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  createPersona($_POST);
}
