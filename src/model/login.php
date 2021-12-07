<?php

function login($data = null)
{
  require_once("db.php");
  require_once("../functions.php");

  if ($data) {
    if (isset($data['user']) && isset($data['password'])) {
      $user = $data['user'];
      $password = $data['password'];

      $sql = "SELECT u.persona_id, concat(p.nombre, ' ', p.apellido) nombre,
       p.correo, u.rol_id, r.nombre rol, f.id ficha_id, f.nombre ficha
            from usuarios u
            inner join personas p on u.persona_id = p.id
            inner join personas_fichas pf on p.id = pf.persona_id
            inner join fichas f on pf.ficha_id = f.id
            inner join roles r on u.rol_id = r.id
            where u.persona_id = ?
            and u.contrasena = ?";

      $res = fetchOne($sql, [$user, $password]);

      if($res && !isset($res['error'])){
        session_start();
        $_SESSION['persona_id'] = $res['persona_id'];
        $_SESSION['persona'] = $res['nombre'];
        $_SESSION['correo'] = $res['correo'];
        $_SESSION['rol_id'] = $res['rol_id'];
        $_SESSION['rol'] = $res['rol'];
        $_SESSION['ficha_id'] = $res['ficha_id'];
        $_SESSION['ficha'] = $res['ficha'];
      }

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
