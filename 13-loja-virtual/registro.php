<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Criar conta | Loja Virtual</title>
    <link rel="stylesheet" href="assets/css/autenticacao.css">
</head>
<body class="pagina-autenticacao">
    <main class="container-autenticacao">
        <a href="index.php" class="logo-autenticacao">Loja <span>Virtual</span></a>

        <section class="card-autenticacao">
            <header class="cabecalho-autenticacao">
                <h1>Crie sua conta</h1>
                <p>Cadastre-se para aproveitar a experiência Loja Virtual.</p>
            </header>

            <form action="actions/validar_registro.php" method="POST" class="formulario-autenticacao">
                <div class="campo-autenticacao">
                    <label for="nome">Nome completo</label>
                    <input type="text" name="nome" id="nome" placeholder="Digite seu nome" required>
                </div>

                <div class="campo-autenticacao">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu email" required>
                </div>

                <div class="campo-autenticacao">
                    <label for="senha">Senha</label>
                    <input type="password" name="senha" id="senha" placeholder="Mínimo de 8 caracteres" minlength="8" required>
                </div>

                <div class="campo-autenticacao">
                    <label for="confirmar_senha">Confirmar senha</label>
                    <input type="password" name="confirmar_senha" id="confirmar_senha" placeholder="Digite sua senha novamente" minlength="8" required>
                </div>

                <button type="submit" class="botao-autenticacao">Criar minha conta</button>
            </form>

            <div class="rodape-autenticacao">
                Já tem uma conta?
                <a href="login.php">Faça login aqui</a>
            </div>
        </section>

        <a href="index.php" class="voltar-loja-autenticacao">← Voltar para a loja</a>
    </main>
</body>
</html>