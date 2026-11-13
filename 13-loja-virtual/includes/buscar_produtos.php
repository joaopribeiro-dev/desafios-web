<?php
    require_once __DIR__ ."/../config/conexao.php";

    $sql = "SELECT produtos.id,
                    produtos.nome,
                    produtos.descricao,
                    produtos.preco,
                    produtos.estoque,
                    produtos.imagem,
                    categorias.nome AS categoria FROM produtos
            INNER JOIN categorias ON produtos.categoria_id = categorias.id
            WHERE produtos.ativo = 1 ORDER BY produtos.id DESC";

    $consulta = $conexao->query($sql);

    $produtos = $consulta->fetchAll();
