<?php
    require_once __DIR__ . "/config/conexao.php";

    $id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);

    if (!$id || $id <= 0) {
        http_response_code(404);
        exit("Produto não encontrado.");
    }

    $sql = "SELECT produtos.id,
                    produtos.nome,
                    produtos.descricao,
                    produtos.preco,
                    produtos.estoque,
                    produtos.imagem,
                    categorias.nome AS categoria FROM produtos
            INNER JOIN categorias ON produtos.categoria_id = categorias.id
            WHERE produtos.id = :id AND produtos.ativo = 1 LIMIT 1";
    
    $consulta = $conexao->prepare($sql);

    $consulta->execute([":id" => $id]);

    $produto = $consulta->fetch();

    if (!$produto) {
        http_response_code(404);
        exit("Produto não encontrado.");
    }

    $imagem = $produto['imagem'];

    $carrinhoImagem = __DIR__ . "/assets/images/" . $imagem;

    $imagemExiste = !empty($imagem) && is_file($carrinhoImagem);

    function escapar (string $valor): string {
        return htmlspecialchars($valor, ENT_QUOTES, "UTF-8");
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= escapar($produto["nome"]) ?> | Loja Virtual</title>
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
        <section class="detalhes-produto">
            <div class="detalhes-imagem">
                <?php if ($imagemExiste): ?>

                <img src="assets/images/<?= escapar($imagem) ?>" alt="<?= escapar($produto["nome"]) ?>">

                <?php else: ?>
                
                <span>Imagem indisponível</span>

                <?php endif; ?>
            </div>
            <div class="detalhes-informacoes">
                <span class="categoria"><?= escapar($produto["categoria"]) ?></span>

                <h1><?= escapar($produto["nome"]) ?></h1>

                <p><?= escapar($produto["descricao"]) ?></p>

                <p class="preco">R$ <?= number_format((float) $produto["preco"], 2, ",", ".") ?></p>

                <p class="estoque"><?php (int) $produto["estoque"] ?> Unidades disponíveis</p>

                <?php if ((int) $produto["estoque"] > 0): ?>
                
                <form action="actions/carrinho_acao.php" method="POST" id="formCarrinho">
                    <input type="hidden" name="produto_id" value="<?= (int) $produto["id"] ?>">
                    <input type="hidden" name="acao" value="adicionar">
            
                    <div class="seletor-quantidade">
                        <label for="quantidade">Quantidade: </label>
            
                        <input type="number" id="quantidade" name="quantidade" min="1" max="<?=(int) $produto["estoque"] ?>" value="1" required>
                    </div>
            
                    <button type="submit" class="botao-produto" id="adicionarCarrinho">
                        Adicionar ao carrinho
                    </button>
            
                    <p id="mensagem" aria-live="polite"></p>
            
                </form>
                
                <?php else: ?>
                
                <p>Produto indisponível no momento.</p>
                
                <?php endif; ?>

                <a href="index.php" class="voltar-loja">Voltar à Loja</a>
            </div>
        </section>
    </main>
    <footer class="rodape">
        <p>&copy; <?= date("Y") ?> Loja Virtual. Todos os direitos reservados.</p>
    </footer>
    <script src="assets/js/script.js"></script>
</body>
</html>