<?php
    require_once "conexao.php";

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nome = trim($_POST["nome"] ?? '');
        $email = trim($_POST["email"] ?? '');
        $pass = $_POST["pass"] ?? '';

        try {
            $sqlCheck = "SELECT * FROM user WHERE email = :email";
            $stmtCheck = $conexao->prepare($sqlCheck);
            $stmtCheck->bindValue(":email", $email);
            $stmtCheck->execute();

            if ($stmtCheck->rowCount() > 0) {
                header("Location: ../registro.php?erro=email_existe");
                exit();
            }

            $passHash = password_hash($pass, PASSWORD_DEFAULT);

            $sql = "INSERT INTO user (nome, email, pass) VALUES (:nome, :email, :pass)";
            $stmt = $conexao->prepare($sql);

            $stmt->bindValue(":nome", $nome);
            $stmt->bindValue(":email", $email);
            $stmt->bindValue(":pass", $passHash);

            if ($stmt->execute()) {
                header("Location: ../login.php");
                exit;
            }
        } catch (PDOException $e) {
            die("Erro ao cadastrar usuário: " . $e->getMessage());
        }
    } else {
        header("Location: ../registro.php");
        exit();
    }
