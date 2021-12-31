<?php

function getReglas(){
  require_once("db.php");
  require_once("../functions.php");

  $sql = "SELECT r.articulo, r.nombre, c.id categoria_id, c.nombre categoria, r.descripcion FROM reglas r
    inner join categorias c on r.categoria_id = c.id";
 
  $res = fetch($sql, []);
  answer_json($res);
}

function createReglas($data = []){
  require_once("db.php");
  require_once("../functions.php");

  $res = insert('reglas', $data);
  answer_json($res);
}


if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  // $data = $_POST ? $_POST : file_get_contents("php://input");
  createReglas($_POST);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  // $data = $_POST ? $_POST : file_get_contents("php://input");
  getReglas();
}