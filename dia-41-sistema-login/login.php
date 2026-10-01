<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Fazer Login</h1>
    <form action="./actions/validar_login.php" method="post">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
        <br>
        <label for="pass">Senha</label>
        <input type="password" name="pass" id="pass" required>
        <br>
        <button type="submit">Entrar</button>
    </form>
    <p>Não tem uma conta? <a href="registro.php">Crie uma conta</a></p>
</body>
</html>