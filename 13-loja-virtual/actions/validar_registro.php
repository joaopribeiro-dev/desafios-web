<?php
    require_once "../config/conexao.php";

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nome = $_POST["nome"] ?? '';
        $email = trim($_POST["email"] ?? '');
        $senha = $_POST["senha"] ?? '';
        $confirmar_senha = $_POST["confirmar_senha"] ?? '';

        if (empty($nome) || empty($email) || empty($senha) || empty($confirmar_senha)) {
            echo "Todos os campos são obrigatórios.";
            exit;
        }

        if (mb_strlen($senha) < 8) {
            echo "A senha deve ter pelo menos 8 caracteres.";
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Email inválido.";
            exit;
        }

        if ($senha !== $confirmar_senha) {
            echo "As senhas não coincidem.";
            exit;
        }

        $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)";

        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha_hash);
        
        try {
            if ($stmt->execute()) {
                echo "Registro realizado com sucesso!";
            } else {
                echo "Erro ao registrar usuário!";
            }
        } catch (PDOException $e) {
            if ($e->getCode() === "23000") {
                echo "Email já registrado! Por favor, use outro email.";
            } else {
                echo "Erro ao registrar usuário";
            }
        }
    }
