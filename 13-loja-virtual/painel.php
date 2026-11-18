<?php
    session_start();

    require_once "config/conexao.php";

    if (!isset($_SESSION["usuario_id"])) {
        header("Location: login.php");
        exit;
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Usuário</title>
</head>
<body>
    <h1>Bem-vindo <?php echo htmlspecialchars($_SESSION["usuario_nome"]); ?></h1>
    <p>Este é o painel do usuário. Aqui você pode acessar informações e funcionalidades exclusivas para usuários autenticados.</p>
    <a href="./actions/logout.php">Sair</a>
    <a href="./actions/delete.php" onclick="return confirm('Tem certeza que deseja excluir sua conta?')" style="color: red;">Excluir sua conta?</a>
</body>
</html>