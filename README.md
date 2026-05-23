# 🐟 AquaFeed - Monitoramento e Alertas para Piscicultura

Bem-vindo ao repositório do desafio da empresa **AquaFeed** da segunda fase do curso Futuro Digital (CEPEDI)! 
Equipe: Campus Lagarto

## 📖 Sobre o Projeto
O objetivo deste projeto é desenvolver o Minimum Viable Product (MVP) do AquaFeed, um sistema web voltado para o monitoramento de dados essenciais na piscicultura. A ferramenta foca na validação rápida do produto, entregando uma interface responsiva e intuitiva para centralizar dados e otimizar a tomada de decisão de produtores e técnicos. A solução engloba o desenvolvimento de ponta a ponta, contemplando tanto o Frontend quanto o Backend.

---

## 🔗 Links Úteis
* **Repositório GitHub:** [Kaiobass/aquafeed](https://github.com/Kaiobass/aquafeed)
* **Protótipo (Frontend):** [Protótipo do Front](https://kaiobass.github.io/aquafeed/)
* **Design Figma:** [Wireframe - Figma](https://www.figma.com/design/6dGuEe7ULDXdJABvBV5R4j/Designer_AquaFeed?node-id=0-1&t=nw6PoKth7fG5RnJk-1)

---

## 📋 Tabela de Requisitos

* **Tabela de Requisitos Funcionais e Não Funcionais:** [Arquivo - Tabelas](https://drive.google.com/file/d/1iYt9pWNpbMF0SwKH4XlvKRx1-2l_k4mc/view?usp=sharing)

---

## 🏗️ Arquitetura e Modelagem

### Diagramas de Arquitetura
img

### Modelagem do Banco de Dados
A modelagem foi pensada com uma arquitetura preparada para o futuro, utilizando uma tabela genérica de parâmetros para facilitar a adição de novos sensores além de temperatura e oxigenação. 
img

---

## 📱 Telas do Projeto (Figma)

<img width="774" height="398" alt="image" src="https://github.com/user-attachments/assets/4c992dbd-c242-48c1-93a0-8cef721b0ec7" />

<img width="773" height="392" alt="image" src="https://github.com/user-attachments/assets/8f464c08-5ac9-4cd5-b46b-18f468d21be5" />


---

## 🚀 Progresso e Tarefas (Milestones)

O cronograma do projeto é dividido em entregas mensais ao longo de 3 meses. Acompanhe o progresso do desenvolvimento abaixo:

### 📍 Milestone 1: Base Forte e Design Focado no Campo (Prazo: 29 de Maio)
**Front-end:**
- [X] Definir identidade visual com foco estrito em mobile-first (botões grandes e acessíveis). 
- [X] Criar wireframes para cadastro de tanques e dashboard.  
- [X] Realizar setup do projeto e entregar layout estático inicial. 

**Back-end:**
- [X] Modelar o banco de dados (SQLite ou Postgres) com tabelas genéricas para parâmetros. 
- [X] Realizar setup do ambiente da API (Node/Express ou Python/FastAPI/Django).  
- [X] Criar endpoints de CRUD para os tanques.  
- [X] Implementar autenticação via JWT. 

### 📍 Milestone 2: Conectividade e Alertas Ativos (Prazo: 30 de Junho)
**Front-end:**
- [ ] Desenvolver dashboard dinâmico consumindo dados da API.  
- [ ] Implementar tabelas e gráficos (Chart.js ou Recharts).  
- [ ] Criar alertas visuais.  
- [ ] Iniciar configuração PWA (Service Worker) para cache.  
- [ ] Implementar lógica offline-first com Local Storage para sincronização de leituras.  

**Back-end:**
- [ ] Criar endpoint para registro de leituras (manual e simulador). 
- [ ] Implementar lógica de cálculo de status (OK, Atenção, Crítico) baseada em temperatura e oxigenação.  
- [ ] Integrar API do Telegram (Bot) ou E-mail (Resend/SendGrid) para alertas ativos.
- [ ] Configurar disparo automático de mensagens para níveis "Críticos" de oxigênio. 

### 📍 Milestone 3: Polimento e "Instalação" (Prazo: 03 de Agosto)
**Geral:**
- [ ] Realizar deploy da aplicação web completa em nuvem (Front e Back).  

**Front-end:**
- [ ] Finalizar configuração do PWA (manifest.json, ícones).  
- [ ] Habilitar função "Adicionar à Tela Inicial" para uso nativo.  
- [ ] Conduzir testes finais de usabilidade.  

**Back-end:**
- [ ] Executar testes de estresse para recebimento de dados sincronizados em massa pós-conexão offline.  
- [ ] Realizar testes de rotas principais e validação de segurança da API. 
