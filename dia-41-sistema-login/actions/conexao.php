<?php
    $host = "sql111.infinityfree.com";
    $dbName = "if0_43082683_db_login";
    $userName = "if0_43082683";
    $password = "Mega8080Mega";

    try {
        $conexao = new PDO("mysql:host=$host;dbname=$dbName;charset=utf8mb4", $userName, $password);

        $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conexao->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        die("Erro ao conectar ao banco de dados: " . $e->getMessage());
    }
