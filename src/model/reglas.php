<?php

function createReglas($data = []){
  require_once("db.php");
  require_once("../functions.php");

  $res = insert('reglas', $data);
  answer_json($res);
}


if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  // $data = $_POST ? $_POST : file_get_contents("php://input");
  createLlamados($_POST);
}