<?php
    session_start();
    require_once "conexao.php";

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $email = trim($_POST["email"] ?? '');
        $pass = $_POST["pass"] ?? '';

        try {
            $sql = "SELECT * FROM user WHERE email = :email";
            $stmt = $conexao->prepare($sql);
            $stmt->bindValue(":email", $email);
            $stmt->execute();

            $usuario = $stmt->fetch();

            if ($usuario && password_verify($pass, $usuario["pass"])) {
                $_SESSION["usuario_id"] = $usuario["id"];
                $_SESSION["usuario_nome"] = $usuario["nome"];

                header("Location: ../painel.php");
                exit();
            } else {
                header("Location: ../login.php");
                exit();
            }
        } catch (PDOException $e) {
            die("Erro ao realizar login: " . $e->getMessage());
        }
    } else {
        header("Location: ../login.php");
        exit();
    }
