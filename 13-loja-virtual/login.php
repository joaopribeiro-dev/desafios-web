<?php
    require_once "config/conexao.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <form action="actions/validar_login.php" method="POST">
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" required>
        <br>
        <label for="senha">Senha: </label>
        <input type="password" name="senha" id="senha" required>
        <br>
        <button type="submit">Entrar</button>
    </form>
    <a href="registro.php">Não tem conta? Cadastre-se aqui!</a>
</body>
</html>