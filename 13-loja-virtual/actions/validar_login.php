<?php
    session_start();

    require_once "../config/conexao.php";

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $email = trim($_POST["email"] ?? '');
        $senha = $_POST["senha"] ?? '';

        if (empty($email) || empty($senha)) {
            echo "Todos os campos são obrigatórios.";
            exit;
        }

        $sql = "SELECT * FROM usuarios WHERE email = :email";

        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(":email", $email);

        if ($stmt->execute()) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($usuario && password_verify($senha, $usuario["senha"])) {
                session_regenerate_id(true);

                $_SESSION["usuario_id"] = $usuario["id"];
                $_SESSION["usuario_nome"] = $usuario["nome"];
                
                header("Location: ../painel.php");
                exit;
            } else {
                echo "Email ou senha inválidos.";
            }
        } else {
            echo "Erro ao consultar usuário!";
        }
    }
