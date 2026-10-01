<?php
    $host = "localhost";
    $dbName = "db_login";
    $userName = "root";
    $password = "";

    try {
        $conexao = new PDO("mysql:host=$host;dbname=$dbName;charset=utf8mb4", $userName, $password);

        $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conexao->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        die("Erro ao conectar ao banco de dados: " . $e->getMessage());
    }
