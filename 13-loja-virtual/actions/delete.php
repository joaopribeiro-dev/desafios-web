<?php
    session_start();
    
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        http_response_code(405);
        exit ("Método não permitido!");
    }

    if (!isset($_SESSION["usuario_id"])) {
        header("Location: ../login.php");
        exit;
    }

    $tokenRecebido = $_POST["csrf_token"] ?? "";
    $tokenSessao = $_SESSION["csrf_token"] ?? "";

    if (!is_string($tokenRecebido) || !is_string($tokenSessao) || empty($tokenRecebido) || empty($tokenSessao) || !hash_equals($tokenSessao, $tokenRecebido)) {
        http_response_code(403);
        exit ("Solicitação inválida. Atualize a página e tente novamente.");
    }

    require_once "../config/conexao.php";

    $id = $_SESSION["usuario_id"];

    try {
        $sql = "DELETE FROM usuarios WHERE id = :id";
        $stmt = $conexao->prepare($sql);
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        
        if ($stmt->rowCount() === 1) {
            session_unset();
            session_destroy();
    
            header("Location: ../login.php?msg=conta_excluida");
            exit;
        }

        http_response_code(404);
        exit ("Não foi possível encontrar a conta para exclusão.");
    } catch (PDOException $e) {
        error_log($e->getMessage());

        http_response_code(409);
        exit ("Não foi possível excluir a conta. Verifique se existem registros vinculados a ela.");
    }
