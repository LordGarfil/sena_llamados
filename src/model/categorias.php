<?php

class Categorias
{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }
  function getCategorias()
  {
    $sql = "SELECT c.id , c.nombre  FROM categorias c";

    $res = $this->db->fetch($sql, []);
    answer_json($res);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $c = new Categorias();
  $c->getCategorias();
}
