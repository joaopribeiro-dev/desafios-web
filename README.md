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

### 🌟 Funcionalidades & Efeitos Visuais

- **Efeito Warp Speed & Câmera 3D**: aceleração dinâmica das estrelas e avanço de perspectiva nos eixos X, Y e Z (profundidade), com *fade-out* ao autenticar.
- **Sistema Espacial (2D)**:
  - **Sol**: renderizado com erupções solares (*flares*) e pulso dinâmico via trigonometria (`Math.sin` / `Math.cos`).
  - **Planetas Intermediários**: sistema planetário alinhado no horizonte cósmico.
  - **Buraco Negro**: simulação de disco de acreção inclinado em $30^\circ$, composto por 200 órbitas de plasma, com efeito visual de lente gravitacional e aparência tridimensional, incluindo a divisão dos arcos frontais e traseiros.
- **Nebulosas Dinâmicas**: nuvens cósmicas geradas por gradientes radiais em movimento contínuo.
- **Scroll Reveal**: animação em cascata (*IntersectionObserver*) para exibição fluida dos cards no `home.html`.

*Em breve: animações em 3D para o Sol, os planetas e o buraco negro, além de novas interações.*

---

## 🛠️ Tecnologias Utilizadas no Repositório

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/mysql-%2300000f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
</p>

- **HTML5**: estruturação semântica das páginas e utilização do elemento Canvas para gráficos e efeitos visuais.
- **CSS3**: estilização moderna, variáveis, efeitos *glassmorphism* e animações.
- **JavaScript (ES6+)**: manipulação da Canvas API, trigonometria para efeitos espaciais, projeção no eixo Z e API `IntersectionObserver`.
- **PHP**: desenvolvimento de funcionalidades de backend, utilizando recursos como PDO, *Prepared Statements* e controle de sessões.
- **MySQL / SQL**: modelagem, consulta e persistência de dados em bancos de dados relacionais.

---

## 📊 Sistema de Progresso Diário

O repositório conta com um sistema automatizado de acompanhamento do progresso, integrado ao Git. Ele registra os dias contabilizados e atualiza o indicador de progresso na página inicial, sem exigir atualizações manuais a cada commit.

### ⚙️ Como funciona

- **`.githooks/pre-commit`**: executa automaticamente o script de atualização antes de cada commit e adiciona os arquivos de progresso ao commit quando necessário.
- **`register-progress.ps1`**: verifica a data local do Windows, identifica datas ainda não contabilizadas e automatiza a atualização do contador de progresso no `home.html`.
- **`progress.json`**: armazena o número atual do dia e o histórico das datas já contabilizadas, evitando que vários commits na mesma data incrementem o contador repetidamente.

### 🔄 Fluxo de atualização

1. Um commit é iniciado.
2. O hook executa o script PowerShell.
3. O script verifica a data local e consulta o histórico no arquivo JSON.
4. Se a data ainda não tiver sido contabilizada, o contador é incrementado e o `home.html` é atualizado.
5. As alterações de progresso são adicionadas ao mesmo commit, mantendo o histórico do Git organizado.

### 🧰 Tecnologias da Automação

<p align="left">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/PowerShell-5391FE?style=for-the-badge&logo=powershell&logoColor=white" alt="PowerShell">
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON">
</p>

- **Git**: utilização de *hooks* para executar tarefas automatizadas antes dos commits e incluir as atualizações de progresso no mesmo commit.
- **PowerShell**: leitura da data local do Windows, identificação de datas ainda não registradas e atualização automatizada do contador.
- **JSON**: armazenamento do número atual do dia e das datas já contabilizadas.

---

## 📈 Monitoramento de Acessos

O portfólio utiliza o **Google Analytics 4 (GA4)** para acompanhar o tráfego e entender como os visitantes interagem com as páginas. O uso da ferramenta depende do consentimento do visitante, que pode aceitar ou recusar a análise sem perder acesso ao site.

- **Consentimento opcional**: o visitante pode aceitar ou recusar o uso do Google Analytics e continuar navegando normalmente, independentemente da escolha.
- **Visualizações de página**: acompanhamento das páginas acessadas, quando autorizado.
- **Engajamento**: registro de interações, como rolagens e outros eventos compatíveis, quando autorizado.
- **Origem e localização aproximada**: análise das fontes de tráfego e das regiões dos visitantes, conforme a disponibilidade dos dados e o consentimento concedido.

O monitoramento ajuda a compreender o alcance do portfólio e identificar quais conteúdos despertam mais interesse, respeitando a escolha de cada visitante.
