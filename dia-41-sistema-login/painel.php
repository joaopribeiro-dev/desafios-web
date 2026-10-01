<?php
    session_start();

    if (!isset($_SESSION['usuario_id'])) {
        header("Location: login.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Usuário</title>
</head>
<body>
    <h1>Bem-vindo <?php echo htmlspecialchars($_SESSION["usuario_nome"])?>!</h1>
    <p>Você está logado e acessou a área restrita do sistema.</p>
    <a href="./actions/logout.php">Sair</a>
</body>
</html>