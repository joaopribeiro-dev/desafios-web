<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Loja Virtual</title>
    <link rel="stylesheet" href="assets/css/autenticacao.css">
</head>
<body class="pagina-autenticacao">
    <main class="container-autenticacao">
        <a href="index.php" class="logo-autenticacao">Loja <span>Virtual</span></a>

        <section class="card-autenticacao">
            <header class="cabecalho-autenticacao">
                <h1>Bem-vindo de volta!</h1>
                <p>Entre com sua conta para continuar comprando.</p>
            </header>

            <form action="actions/validar_login.php" method="POST" class="formulario-autenticacao">
                <div class="campo-autenticacao">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu email" required>
                </div>

                <div class="campo-autenticacao">
                    <label for="senha">Senha</label>
                    <input type="password" name="senha" id="senha" placeholder="Digite sua senha" required>
                </div>

                <button type="submit" class="botao-autenticacao">Entrar na conta</button>
            </form>

            <div class="rodape-autenticacao">
                Não tem uma conta?
                <a href="registro.php">Cadastre-se aqui</a>
            </div>
        </section>

        <a href="index.php" class="voltar-loja-autenticacao">← Voltar para a loja</a>
    </main>
</body>
</html>