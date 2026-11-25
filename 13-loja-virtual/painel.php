<?php
    session_start();

    require_once "config/conexao.php";

    if (!isset($_SESSION["usuario_id"])) {
        header("Location: login.php");
        exit;
    }

    if (empty($_SESSION["csrf_token"])) {
        $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
    }

    $nome = htmlspecialchars($_SESSION["usuario_nome"], ENT_QUOTES, "UTF-8");
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Usuário | Loja Virtual</title>
    <link rel="stylesheet" href="assets/css/painel.css">
</head>
<body class="pagina-painel">
    <main class="container-painel">
        <a href="index.php" class="logo-painel">Loja <span>Virtual</span></a>

        <section class="card-painel">
            <header class="cabecalho-painel">
                <h1>Olá, <span><?php echo $nome; ?></span>!</h1>
                <p>Bem-vindo ao seu painel de usuário. Aqui você pode gerenciar sua conta e acessar suas funcionalidades.</p>
            </header>

            <div class="conteudo-painel">
                <h2>Minha conta</h2>
                <p>Gerencie seu acesso à Loja Virtual utilizando as opções abaixo.</p>
            </div>

            <div class="acoes-painel">
                <a href="actions/logout.php" class="botao-painel botao-sair">Sair da conta</a>

                <form action="actions/delete.php" method="POST">
                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION["csrf_token"], ENT_QUOTES, "UTF-8") ?>">
                    <button type="submit" class="botao-painel botao-excluir" onclick="return confirm('Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.')">Excluir conta</button>
                </form>
            </div>
        </section>

        <a href="index.php" class="voltar-painel">Voltar para a loja</a>
    </main>
</body>
</html>