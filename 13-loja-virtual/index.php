<?php
    require_once __DIR__ . "/includes/buscar_produtos.php";

    function escapar(string $valor): string {
        return htmlspecialchars($valor, ENT_QUOTES, "UTF-8");
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loja Virtual | Seu lugar preferido para comprar produtos</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="cabecalho">
        <div class="container">
            <a href="index.php" class="logo">Loja Virtual</a>

            <nav>
                <a href="index.php">Início</a>
                <a href="carrinho.php">Carrinho</a>
                <a href="login.php">Entrar</a>
            </nav>
        </div>
    </header>
    <main class="container">
        <section class="destaque">
            <h1>Bem-Vindo à Loja Virtual</h1>

            <p>Encontre os melhores produtos pelo melhor preço!</p>
        </section>

        <section class="catalogo">
            <h2>Nossos produtos</h2>
            <?php if (count($produtos) > 0): ?>
                <div class="grade-produtos">
                    <?php foreach ($produtos as $produto): ?>
                    <?php
                        $imagem = $produto['imagem'];
                        $carrinhoImagem = __DIR__ . "/assets/images/" . $imagem;
                        $imagemExiste = !empty($imagem) && is_file($carrinhoImagem);
                    ?>
                    <article class="card-produto">
                        <div class="imagem-produto">
                            <?php if ($imagemExiste): ?>

                            <img src="assets/images/<?= escapar($imagem) ?>" alt="<?= escapar($produto["nome"]) ?>">

                            <?php else: ?>
                            
                            <span>Imagem indisponível</span>

                            <?php endif; ?>
                        </div>
                        <div class="imformacoes-produto">
                            <span class="categoria"><?= escapar($produto["categoria"]) ?></span>

                            <h3><?= escapar($produto["nome"]) ?></h3>

                            <p><?= escapar($produto["descricao"]) ?></p>

                            <p class="preco">R$ <?= number_format((float) $produto["preco"], 2, ",", ".") ?></p>

                            <p class="estoque">Estoque: <?= (int) $produto["estoque"] ?></p>

                            <a href="produto.php?id=<?= (int) $produto["id"] ?>" class="botao-produto">Ver produto</a>
                        </div>
                    </article>

                    <?php endforeach; ?>
                </div>

                <?php else: ?>
                    <p>Nenhum produto disponível no momento.</p>
                <?php endif; ?>
        </section>
    </main>
    <footer class="rodape">
        <p>&copy; <?= date("Y") ?> Loja Virtual. Todos os direitos reservados.</p>    
    </footer>
</body>
</html>