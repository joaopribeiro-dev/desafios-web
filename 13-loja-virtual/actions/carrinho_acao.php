<?php
    session_start();

    require_once __DIR__ . "/../config/conexao.php";

    function redirecionarCarrinho(string $tipo, string $texto): void {
        $_SESSION["mensagem_carrinho"] = [
            "tipo" => $tipo,
            "texto" => $texto
        ];

        header("Location: ../carrinho.php");
        exit;
    }

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        header("Location: ../carrinho.php");
        exit;
    }

    $acao = $_POST["acao"] ?? "";

    if (!isset($_SESSION["carrinho"])) {
        $_SESSION["carrinho"] = [];
    }

    // ==========================================
    // 1. ESVAZIAR CARRINHO
    // ==========================================

    if ($acao === "esvaziar") {
        $_SESSION["carrinho"] = [];

        redirecionarCarrinho("sucesso", "Carrinho esvaziado com sucesso.");
    }

    $produtoId = filter_input(INPUT_POST, "produto_id", FILTER_VALIDATE_INT);

    if (!$produtoId || $produtoId <= 0) {
        redirecionarCarrinho("erro", "Produto inválido.");
    }

    // ==========================================
    // 2. REMOVER PRODUTO
    // ==========================================

    if ($acao === "remover") {
        if (!isset($_SESSION["carrinho"][$produtoId])) {
            redirecionarCarrinho("erro", "Produto não encontrado no carrinho.");
        }

        unset($_SESSION["carrinho"][$produtoId]);

        redirecionarCarrinho("sucesso", "Produto removido do carrinho com sucesso.");
    }

    // ==========================================
    // 3. ADICIONAR OU ATUALIZAR QUANTIDADE
    // ==========================================

    if ($acao !== "adicionar" && $acao !== "atualizar") {
        redirecionarCarrinho("erro", "Ação inválida.");
    }

    $quantidade = filter_input(INPUT_POST, "quantidade", FILTER_VALIDATE_INT);

    if (!$quantidade || $quantidade <= 0) {
        redirecionarCarrinho("erro", "Quantidade inválida.");
    }

    $sql = "SELECT id, nome, preco, estoque, imagem FROM produtos WHERE id = :id AND ativo = 1 LIMIT 1";

    $consulta = $conexao->prepare($sql);

    $consulta->execute([":id" => $produtoId]);

    $produto = $consulta->fetch();

    if (!$produto) {
        redirecionarCarrinho("erro", "Produto não encontrado.");
    }

    if ($acao === "adicionar") {
        $quantidadeFinal = ($_SESSION["carrinho"][$produtoId]["quantidade"] ?? 0) + $quantidade;
    } else {
        $quantidadeFinal = $quantidade;
    }

    if ($quantidadeFinal > (int) $produto["estoque"]) {
        redirecionarCarrinho("erro", "Quantidade solicitada excede o estoque disponível.");
    }

    $_SESSION["carrinho"][$produtoId] = [
        "id" => (int) $produto["id"],
        "nome" => $produto["nome"],
        "preco" => (float) $produto["preco"],
        "imagem" => $produto["imagem"],
        "quantidade" => $quantidadeFinal
    ];

    if ($acao === "adicionar") {
        redirecionarCarrinho("sucesso", "Produto adicionado ao carrinho com sucesso.");
    }

    redirecionarCarrinho("sucesso", "Quantidade do produto atualizada com sucesso.");
