<?php


function getUsuario($id = null)
{
  require_once("db.php");
  require_once("../functions.php");

  $sql = "SELECT persona_id
      from usuarios u
      where u.persona_id = ?";
 
  $res = fetchOne($sql, [$id]);
  answer_json($res);
}

function createPersona($data = []){
  require_once("db.php");
  require_once("../functions.php");
  $sql = "INSERT INTO personas(id, nombre, apellido, rol_id, correo)
          VALUES (?, ?, ?, ?, ?)";
  $res = insert($sql, $data);
  answer_json($res);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  getUsuario($_GET['id']);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  // createPersona(file_get_contents("php://input"));
}
