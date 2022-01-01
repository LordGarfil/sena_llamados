<?php


function getUsuario($id)
{
  require_once("db.php");
  require_once("../functions.php");

  $sql = "SELECT persona_id
      from usuarios u
      where u.persona_id = ?";
 
  $res = fetchOne($sql, [$id]);
  answer_json($res);
}

function createUsuario($data){
  require_once("db.php");
  require_once("../functions.php");

  $res = insert('usuarios', $data);
  answer_json($res);
  return $res;
}

function createEstudiante($data){

}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  getUsuario($_GET['id']);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  // createPersona(file_get_contents("php://input"));
}
