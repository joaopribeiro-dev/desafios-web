<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="./styles/reset.css">
    <link rel="stylesheet" href="./styles/global.css">
</head>
<body>
    <div class="registro">
        <h1>Criar Conta</h1>
        <form action="./actions/validar_registro.php" method="post">
            <label for="nome">Nome</label>
            <input type="text" name="nome" id="nome" placeholder="Digite seu nome aqui!" required>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Digite seu email aqui!" required>
            <label for="pass">Senha</label>
            <input type="password" name="pass" id="pass" minlength="8" placeholder="Digite sua senha aqui!" required>
            <button type="submit">Registrar</button>
        </form>
        <p>Já tem uma conta? <a href="login.php">Faça login</a></p>
    </div>
</body>
</html>