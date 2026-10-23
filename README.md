# 🌌 Prática Web

<p align="center">
  <img src="https://img.shields.io/github/languages/top/joaopribeiro-dev/desafios-web?color=ff0000&style=for-the-badge" alt="Top Language">
  <img src="https://img.shields.io/github/repo-size/joaopribeiro-dev/desafios-web?color=7f00ff&style=for-the-badge" alt="Repo Size">
  <img src="https://img.shields.io/github/last-commit/joaopribeiro-dev/desafios-web?color=ffff00&style=for-the-badge" alt="Last Commit">
</p>

<p align="center">
  <b>Repositório dedicado à prática contínua de desenvolvimento web, projetos interativos em Canvas e desafios de lógica utilizando o ecossistema Web e Backend.</b>
</p>

---

## 🚀 Destaque do Projeto: Tela Espacial (*Sci-Fi Portal*)

O projeto principal deste repositório conta com uma **tela de acesso imersiva** construída do zero utilizando **HTML5 Canvas API**, simulação matemática de corpos celestes e transição dinâmica de páginas.

### 🌟 Funcionalidades & Efeitos Visuais:
- **Efeito Warp Speed & Câmera 3D**: Aceleração dinâmica das estrelas e avanço de perspectiva nos eixos X, Y e Z (profundidade) com *fade-out* ao autenticar.
- **Sistema Espacial (2D)**:
  - **Sol**: Renderizado com erupções solares (*flares*) e pulso dinâmico via trigonometria (`Math.sin` / `Math.cos`).
  - **Planetas Intermediários**: Sistema planetário alinhado no horizonte cósmico.
  - **Buraco Negro**: Simulação de disco de acreção inclinado em $30^\circ$, composto por 200 órbitas de plasma com efeito de lente gravitacional em 3D (divisão de arcos frontal e traseiro).
- **Nebulosas Dinâmicas**: Nuvens cósmicas geradas por gradientes radiais em movimento contínuo.
- **Scroll Reveal**: Animação em cascata (*IntersectionObserver*) para exibição fluida dos cards no `home.html`.

- ***Em breve: animações em 3D para o Sol, os planetas e o buraco negro, além de novas interações.***
---

## 🛠️ Tecnologias Utilizadas no Repositório

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/mysql-%2300000f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</p>

- **HTML5**: Estruturação semântica da aplicação e elemento Canvas para gráficos 2D/3D.
- **CSS3**: Estilização moderna, variáveis, efeitos glassmorphism e animações.
- **JavaScript (ES6+)**: Manipulação de Canvas API, trigonometria para efeitos espaciais, projeção $Z$ e API `IntersectionObserver`.
- **PHP**: Backend seguro utilizando PDO, Prepared Statements e controle de sessões.
- **MySQL / SQL**: Modelagem e persistência de dados no banco de dados.
