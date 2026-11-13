<?php
    declare(strict_types=1);

    $host = 'localhost';
    $banco = 'loja_virtual';
    $user = 'root';
    $password = '';

    $opcoes = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ];

    try {
        $conexao = new PDO("mysql:host=$host;dbname=$banco;charset=utf8", $user, $password, $opcoes);
    } catch (PDOException $e) {
        die('Erro ao conectar ao banco de dados: ' . $e->getMessage());
    }
