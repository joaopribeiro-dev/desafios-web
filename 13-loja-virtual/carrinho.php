<?php
    session_start();

    $carrinho = $_SESSION["carrinho"] ?? [];
    
    $mensagem = $_SESSION["mensagem_carrinho"] ?? null;

    unset($_SESSION["mensagem_carrinho"]);

    $total = 0;

    foreach ($carrinho as $item) {
        $total += (float) $item["preco"] * (int) $item["quantidade"];
    }

    function escapar(string $valor): string {
        return htmlspecialchars($valor, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
    }
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Meu carrinho | Nexus Store</title>

    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="cabecalho">

        <div class="container">

            <a href="index.php" class="logo">
                Nexus Store
            </a>

            <nav>
                <a href="index.php">Início</a>
                <a href="carrinho.php">Carrinho</a>
                <a href="login.php">Entrar</a>
            </nav>

        </div>

    </header>
    <main class="container">

        <section class="pagina-carrinho">

            <h1>Meu carrinho</h1>

            <?php if ($mensagem): ?>

                <div class="mensagem-carrinho <?= escapar($mensagem["tipo"]) ?>">
                    <?= escapar($mensagem["texto"]) ?>
                </div>

            <?php endif; ?>

            <?php if (!empty($carrinho)): ?>

                <div class="lista-carrinho">

                    <?php foreach ($carrinho as $item): ?>

                        <article class="item-carrinho">

                            <div class="item-carrinho-imagem">

                                <?php
                                $imagem = $item["imagem"] ?? "";

                                $caminhoImagem = __DIR__ . "/assets/images/" . $imagem;

                                $imagemExiste = !empty($imagem)
                                    && is_file($caminhoImagem);
                                ?>

                                <?php if ($imagemExiste): ?>

                                    <img
                                        src="assets/images/<?= escapar($imagem) ?>"
                                        alt="<?= escapar($item["nome"]) ?>"
                                    >

                                <?php else: ?>

                                    <span>Sem imagem</span>

                                <?php endif; ?>

                            </div>

                            <div class="item-carrinho-info">

                                <h2><?= escapar($item["nome"]) ?></h2>

                                <p>
                                    Preço unitário:
                                    R$ <?= number_format(
                                        (float) $item["preco"],
                                        2,
                                        ",",
                                        "."
                                    ) ?>
                                </p>

                                <p class="subtotal">
                                    Subtotal:
                                    R$ <?= number_format(
                                        (float) $item["preco"] * (int) $item["quantidade"],
                                        2,
                                        ",",
                                        "."
                                    ) ?>
                                </p>

                                <div class="acoes-item-carrinho">

                                    <form
                                        action="actions/carrinho_acao.php"
                                        method="POST"
                                        class="form-atualizar"
                                    >

                                        <input
                                            type="hidden"
                                            name="acao"
                                            value="atualizar"
                                        >

                                        <input
                                            type="hidden"
                                            name="produto_id"
                                            value="<?= (int) $item["id"] ?>"
                                        >

                                        <label for="quantidade-<?= (int) $item["id"] ?>">
                                            Quantidade:
                                        </label>

                                        <input
                                            type="number"
                                            id="quantidade-<?= (int) $item["id"] ?>"
                                            name="quantidade"
                                            min="1"
                                            value="<?= (int) $item["quantidade"] ?>"
                                            required
                                        >

                                        <button type="submit" class="botao-atualizar">
                                            Atualizar
                                        </button>

                                    </form>

                                    <form
                                        action="actions/carrinho_acao.php"
                                        method="POST"
                                    >

                                        <input
                                            type="hidden"
                                            name="acao"
                                            value="remover"
                                        >

                                        <input
                                            type="hidden"
                                            name="produto_id"
                                            value="<?= (int) $item["id"] ?>"
                                        >

                                        <button type="submit" class="botao-remover">
                                            Remover
                                        </button>

                                    </form>

                                </div>

                            </div>

                        </article>

                    <?php endforeach; ?>

                </div>

                <section class="resumo-carrinho">

                    <h2>Resumo da compra</h2>

                    <p>
                        Total:
                        <strong>
                            R$ <?= number_format($total, 2, ",", ".") ?>
                        </strong>
                    </p>

                    <button type="button" class="botao-produto" disabled>
                        Finalizar compra (em breve)
                    </button>

                    <form
                        action="actions/carrinho_acao.php"
                        method="POST"
                        class="form-esvaziar"
                    >

                        <input
                            type="hidden"
                            name="acao"
                            value="esvaziar"
                        >

                        <button type="submit" class="botao-esvaziar">
                            Esvaziar carrinho
                        </button>

                    </form>

                </section>

            <?php else: ?>

                <div class="carrinho-vazio">

                    <h2>Seu carrinho está vazio.</h2>

                    <p>Que tal encontrar algo interessante na nossa loja?</p>

                    <a href="index.php" class="botao-produto">
                        Explorar produtos
                    </a>

                </div>

            <?php endif; ?>

        </section>

    </main>
    <footer class="rodape">
        <p>&copy; <?= date("Y") ?> Nexus Store. Todos os direitos reservados.</p>
    </footer>
</body>
</html>