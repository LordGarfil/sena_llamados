<?php

class Fichas
{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }
  function getFichas()
  {
    $sql = "SELECT f.id , f.nombre  FROM fichas f";

    $res = $this->db->fetch($sql, []);
    answer_json($res);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $c = new Fichas();
  $c->getFichas();
}
