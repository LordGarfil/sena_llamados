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
  require_once("../functions.php");
  $sql = "INSERT INTO personas(id, nombre, apellido, rol_id, correo)
          VALUES (?, ?, ?, ?, ?)";
  $res = insert($sql, $data);
  answer_json($res);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  getPersona($_GET['id']);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  createPersona(file_get_contents("php://input"));
}
