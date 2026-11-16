<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>
<body>
    <h1>Registro</h1>
    <form action="actions/validar_registro.php" method="POST">
        <label for="nome">Nome: </label>
        <input type="text" name="nome" id="nome" required>
        <br>
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" required>
        <br>
        <label for="senha">Senha: </label>
        <input type="password" name="senha" id="senha" minlength="8" required>
        <br>
        <label for="confirmar_senha">Confirmar Senha: </label>
        <input type="password" name="confirmar_senha" id="confirmar_senha" minlength="8" required>
        <br>
        <button type="submit">Registrar</button>
    </form>
    <a href="login.php">Já tem conta? Faça login aqui!</a>
</body>
</html>