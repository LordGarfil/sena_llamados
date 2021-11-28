<?php


function getUsuario($id = null)
{
  require_once("db.php");
  require_once("../functions.php");

  try {
    $sql = "SELECT p.id personaId, concat(p.nombre, ' ', p.apellido) nombre,
       p.correo, r.id rolId, r.nombre rol
      from personas p
      inner join roles r on p.rol_id = r.id
      where p.id = ?";

    $sth = $pdo->prepare($sql);
    $sth->execute([$id]);

    if ($userRes = $sth->fetch(PDO::FETCH_ASSOC)) {
            answer_json($userRes);
        } else {
            catchErrors("La persona no existe");
        }
  } catch (PDOException $e) {
    catchErrors($e->getMessage());
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  getPersona($_GET['id']);
}