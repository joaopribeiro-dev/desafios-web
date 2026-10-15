<?php
    session_start();
    require_once "conexao.php";

    if (!isset($_SESSION["usuario_id"])) {
        header("Location: ../login.php");
        exit;
    }

    $id = $_SESSION["usuario_id"];

    $sql = "DELETE FROM user WHERE id = :id";
    $stmt = $conexao->prepare($sql);
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        session_unset();
        session_destroy();

        header("Location: ../login.php?msg=conta_excluida");
        exit;
    } else {
        echo "Erro ao tentar excluir a conta.";
    }
