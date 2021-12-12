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

function fetch($sql, $params)
{
    require_once("../functions.php");
    try {
        $pdo = connect();
        $sth = $pdo->prepare($sql);
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
    require_once("../functions.php");
    $pdo = connect();
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
        $stmt = $pdo->prepare($sql);

        $pdo->beginTransaction();
        $stmt->execute();
        $res = $pdo->commit();
        if ($res == "true") {
            $sql = "select id
                    from {$table}
                    order by id desc
                    limit 1";
            $sth = $pdo->prepare($sql);
            $sth->execute();

            $userRes = $sth->fetch(PDO::FETCH_ASSOC);
            return $userRes;
        }
    } catch (Exception $e) {
        $pdo->rollback();
        throw $e;
    }
}
