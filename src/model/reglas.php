<?php

class Reglas
{
  public function __construct()
  {
    include("db.php");
    $this->db = new Db();
  }
  function getReglas()
  {
    $sql = "SELECT r.id,  r.articulo, r.nombre, c.id categoria_id, c.nombre categoria, r.descripcion FROM reglas r
    inner join categorias c on r.categoria_id = c.id";

    $res = $this->db->fetch($sql, []);
    answer_json($res);
  }

  function createReglas($data = [])
  {
    $res = $this->db->insert('reglas', $data);
    answer_json($res);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $r = new Reglas();
  $r->createReglas($_POST);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $r = new Reglas();
  $r->getReglas();
}
