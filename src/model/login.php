<?php

function login($data = null)
{
  require_once("db.php");
  require_once("../functions.php");

  if ($data) {
    if (isset($data['user']) && isset($data['password'])) {
      $user = $data['user'];
      $password = $data['password'];

      $sql = "SELECT u.persona_id, u.rol_id
            from usuarios u
            where u.persona_id = ?
            and u.contrasena = ?";

      $res = fetchOne($sql, [$user, $password]);
      answer_json($res);
    }else{
      $error = catchErrors("Debe enviar un usuario y contraseña");
      answer_json($error);
    }
  }else{
    $error = catchErrors("Debe enviar un usuario y contraseña");
    answer_json($error);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  login($_POST);
}
