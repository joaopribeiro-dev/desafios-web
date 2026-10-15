<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="./styles/reset.css">
    <link rel="stylesheet" href="./styles/global.css">
</head>
<body>
    <div class="login">
        <h1>Fazer Login</h1>
        <form action="./actions/validar_login.php" method="post">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Digite seu email aqui!" required>
            <label for="pass">Senha</label>
            <input type="password" name="pass" id="pass" placeholder="Digite sua senha aqui!" required>
            <button type="submit">Entrar</button>
        </form>
        <p>Não tem uma conta? <a href="registro.php">Crie uma conta</a></p>
    </div>
</body>
</html>