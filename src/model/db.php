<?php

function connect()
{
    require_once '../../config.php';
    try {
        $pdo = new PDO($DB_URL, $DB_USER, $DB_PASSWORD);
        return $pdo;
    } catch (PDOException $e) {
        print "¡Error!: " . $e->getMessage() . "<br/>";
        die();
    }
}

function fetchOne($sql, $params)
{
    require_once("../functions.php");
    try {
        $pdo = connect();
        $sth = $pdo->prepare($sql);
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

function insert($sql, $data)
{
    require_once("../functions.php");
    $pdo = connect();
    $stmt = $pdo->prepare($sql);
    try {
        $pdo->beginTransaction();
        foreach ($data as $row) {
            $stmt->execute($row);
        }
        return $pdo->commit();
    } catch (Exception $e) {
        $pdo->rollback();
        throw $e;
    }
}
