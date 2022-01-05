<?php

function getCategorias(){
  require_once("db.php");
  require_once("../functions.php");

  $sql = "SELECT c.id , c.nombre  FROM categorias c";
 
  $res = fetch($sql, []);
  answer_json($res);
}

// function createReglas($data = []){
//   require_once("db.php");
//   require_once("../functions.php");

//   $res = insert('reglas', $data);
//   answer_json($res);
// }


// if ($_SERVER['REQUEST_METHOD'] == 'POST'){
//   // $data = $_POST ? $_POST : file_get_contents("php://input");
//   createReglas($_POST);
// }

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  getCategorias();
}