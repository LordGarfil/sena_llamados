<?php

class Db
{
  public function __construct()
  {
    require '../../config.php';
    require("../functions.php");

    $this->DB_URL = $DB_URL;
    $this->DB_USER = $DB_USER;
    $this->DB_PASSWORD = $DB_PASSWORD;

    $this->pdo = $this->connect();
  }
  function connect()
  {
    try {
      $pdo = new PDO($this->DB_URL, $this->DB_USER, $this->DB_PASSWORD);
      return $pdo;
    } catch (PDOException $e) {
      print "¡Error!: " . $e->getMessage() . "<br/>";
      die();
    }
  }

  function fetchOne($sql, $params)
  {
    try {
      $sth = $this->pdo->prepare($sql);
      $sth->execute($params);

      if ($userRes = $sth->fetch(PDO::FETCH_ASSOC)) {
        return $userRes;
      } else {
        return catchErrors("No encontrado");
      }
    } catch (PDOException $e) {
      return catchErrors($e->getMessage());
    }
  }

  function fetch($sql, $params)
  {
    try {
      $sth = $this->pdo->prepare($sql);
      $sth->execute($params);
      $resData = $sth->fetchAll(PDO::FETCH_ASSOC);

      if ($resData) {
        return $resData;
      } else {
        return catchErrors("No encontrado");
      }
    } catch (PDOException $e) {
      return catchErrors($e->getMessage());
    }
  }

  function insert($table, $data)
  {
    try {
      $keys = implode(',', array_keys($data));
      $data_ = [];
      foreach ($data as $item) {
        if (gettype($item) == "string") {
          $item = "'" . $item . "'";
        }
        array_push($data_, $item);
      }
      $values = implode(',', $data_);
      $sql = "INSERT INTO {$table}({$keys})
          VALUES ({$values})";
      $stmt = $this->pdo->prepare($sql);

      $this->pdo->beginTransaction();
      $stmt->execute();
      $res = $this->pdo->commit();
      if ($res == "true") {
        $sql = "select id
                    from {$table}
                    order by id desc
                    limit 1";
        $sth = $this->pdo->prepare($sql);
        $sth->execute();

        $userRes = $sth->fetch(PDO::FETCH_ASSOC);
        return $userRes;
      }
    } catch (Exception $e) {
      $this->pdo->rollback();
      throw $e;
    }
  }
}
