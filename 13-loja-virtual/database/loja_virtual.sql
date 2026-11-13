-- ==========================================
-- LOJA VIRTUAL
-- Script de criação do banco de dados
-- ==========================================

-- 1. CRIAÇÃO DO BANCO DE DADOS

CREATE DATABASE IF NOT EXISTS loja_virtual
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE loja_virtual;

-- ==========================================
-- 2. TABELA: USUARIOS
-- ==========================================

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================
-- 3. TABELA: CATEGORIAS
-- ==========================================

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================
-- 4. TABELA: PRODUTOS
-- ==========================================

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    imagem VARCHAR(255),
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_produtos_categorias
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id),

    CONSTRAINT chk_produtos_preco
        CHECK (preco >= 0),

    CONSTRAINT chk_produtos_estoque
        CHECK (estoque >= 0)
) ENGINE=InnoDB;

-- ==========================================
-- 5. TABELA: CARRINHO
-- ==========================================

CREATE TABLE IF NOT EXISTS carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_carrinho_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT fk_carrinho_produtos
        FOREIGN KEY (produto_id)
        REFERENCES produtos(id),

    CONSTRAINT uq_carrinho_usuario_produto
        UNIQUE (usuario_id, produto_id),

    CONSTRAINT chk_carrinho_quantidade
        CHECK (quantidade > 0)
) ENGINE=InnoDB;

-- ==========================================
-- 6. TABELA: PEDIDOS
-- ==========================================

CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM(
        'pendente',
        'pago',
        'enviado',
        'entregue',
        'cancelado'
    ) NOT NULL DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pedidos_usuarios
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CONSTRAINT chk_pedidos_total
        CHECK (total >= 0)
) ENGINE=InnoDB;

-- ==========================================
-- 7. TABELA: ITENS_PEDIDOS
-- ==========================================

CREATE TABLE IF NOT EXISTS itens_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT DEFAULT NULL,
    nome_produto VARCHAR(150) NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_itens_pedidos_pedidos
        FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id),

    CONSTRAINT fk_itens_pedidos_produtos
        FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_itens_quantidade
        CHECK (quantidade > 0),

    CONSTRAINT chk_itens_preco
        CHECK (preco_unitario >= 0)
) ENGINE=InnoDB;

-- ==========================================
-- 8. CATEGORIAS INICIAIS
-- ==========================================

INSERT INTO categorias (nome, descricao)
SELECT dados.nome, dados.descricao
FROM (
    SELECT 'Eletrônicos' AS nome, 'Produtos eletrônicos e dispositivos.' AS descricao
    UNION ALL
    SELECT 'Informática', 'Equipamentos e acessórios de informática.'
    UNION ALL
    SELECT 'Vestuário', 'Roupas e peças para o dia a dia.'
    UNION ALL
    SELECT 'Acessórios', 'Acessórios variados.'
    UNION ALL
    SELECT 'Casa', 'Produtos para casa e decoração.'
    UNION ALL
    SELECT 'Games', 'Produtos e acessórios para jogos.'
) AS dados
WHERE NOT EXISTS (
    SELECT 1
    FROM categorias
    WHERE categorias.nome = dados.nome
);

-- ==========================================
-- 9. PRODUTOS INICIAIS
-- ==========================================

INSERT INTO produtos (
    categoria_id,
    nome,
    descricao,
    preco,
    estoque,
    imagem,
    ativo
)
SELECT
    categorias.id,
    dados.nome,
    dados.descricao,
    dados.preco,
    dados.estoque,
    dados.imagem,
    1
FROM (
    SELECT 1 AS categoria_id, 'Fone Bluetooth' AS nome,
        'Fone sem fio com estojo de carregamento.' AS descricao,
        89.90 AS preco, 20 AS estoque, 'fone-bluetooth.jpg' AS imagem

    UNION ALL

    SELECT 1, 'Smartwatch',
        'Relógio inteligente com monitoramento de atividades.',
        159.90, 15, 'smartwatch.jpg'

    UNION ALL

    SELECT 2, 'Mouse Gamer',
        'Mouse óptico com iluminação RGB.',
        79.90, 30, 'mouse-gamer.jpg'

    UNION ALL

    SELECT 3, 'Camiseta Básica',
        'Camiseta confortável para o dia a dia.',
        49.90, 25, 'camiseta.jpg'

    UNION ALL

    SELECT 4, 'Mochila Casual',
        'Mochila para estudos e uso cotidiano.',
        119.90, 12, 'mochila.jpg'

    UNION ALL

    SELECT 6, 'Controle Gamer',
        'Controle para jogos com conexão USB.',
        139.90, 10, 'controle-gamer.jpg'
) AS dados
INNER JOIN categorias
    ON categorias.id = dados.categoria_id
WHERE NOT EXISTS (
    SELECT 1
    FROM produtos
    WHERE produtos.nome = dados.nome
);