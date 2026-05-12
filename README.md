![Banner](https://capsule-render.vercel.app/api?type=waving&color=0:7b1fa2,100:e040fb&height=200&section=header&text=Conecta%20Ajuda&fontSize=40&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Inspirada%20no%20cenário%20atual%20de%20enchentes!&descAlignY=55&descSize=16)

# 💜 Conecta Ajuda: Gestão Inteligente de Doações

<div align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-green?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</div>

<div align="center">

🚀 Acesse o Projeto

**🔗 [Clique aqui e conheça o Projeto Desafio Connect!!](https://conecta-ajuda-frontend.vercel.app)**

</div>

<br>

## 📌 1. Apresentação da Ideia
Este projeto foi desenvolvido como parte do **Desafio Técnico Final** focado em desastres naturais. A ideia surgiu a partir da observação das enchentes recorrentes no Brasil, onde a solidariedade é imensa, mas a logística muitas vezes falha. O **Conecta Ajuda** foca no problema da descentralização e desequilíbrio de suprimentos, criando uma ponte digital direta entre quem quer doar e quem realmente precisa receber.

## ⚠️ 2. O Problema Escolhido
**Cenário: Organização de Doações.** Em situações críticas, a falta de comunicação gera um paradoxo: enquanto alguns abrigos recebem toneladas de roupas desnecessárias, outros sofrem com a falta de itens básicos como água ou kits de higiene. O problema central é a **falta de visibilidade em tempo real** das necessidades específicas de cada ponto de apoio.

## 💡 3. Solução Proposta
O sistema consiste em uma plataforma de monitoramento de inventário e necessidades para centros de distribuição:
- **Para o Doador:** Uma visão clara e priorizada (por cores e níveis de urgência) do que falta em cada local próximo a ele.
- **Para o Administrador/Voluntário:** Um painel simples para atualizar o estoque atual e ajustar as metas de arrecadação conforme a demanda local muda.
- **Objetivo Final:** Equilibrar a logística humanitária, garantindo que o item certo chegue ao lugar certo.

> **Estratégia de Implementação:** O Conecta Ajuda atua como base de dados centralizada. A divulgação é focada em parcerias com a Defesa Civil e ONGs via QR Codes nos Pontos de Coleta e comunicações oficiais.

---

## 🛠️ 4. Estrutura do Sistema

### 🎨 Front-end
- **Tecnologias:** `React.js`, `Vite`, `Sass (SCSS)`, `Tailwind CSS` e `Lucide React`.
- **Funcionalidades:** 
  - **Dashboard de Necessidades:** Visualização clara com barra de progresso dinâmica e filtros por categoria/prioridade.
  - **Gestão de Usuários (Admin):** Painel exclusivo para administração de perfis, permitindo o remanejamento de administradores entre Centros de Distribuição.
  - **Fluxo de Doação:** Registro rápido de intenção de doação e localização de pontos de apoio.
  - **Design Responsivo:** Interface otimizada para uso em dispositivos móveis por voluntários em campo.

### ⚙️ Back-end
- **Tecnologias:** `Node.js`, `Express` e `node-postgres (PG)`.

- **Funcionalidades:**
    - **Gestão de Acesso (RBAC):** Middleware de proteção de rotas diferenciando ações de Administradores e Doadores.
  - **API de Usuários:** Endpoints para cadastro, autenticação e atualização de perfil (remanejamento de CD).
  - **Lógica de Estoque Automática:** Incremento de inventário vinculado à confirmação de entrega de doações.

- **Repositório:** [Conecta Ajuda Backend](https://github.com/RaizerTechDev/conecta-ajuda-backend)

### 🗄️ Banco de Dados (PostgreSQL)
  - **usuarios:** Armazena perfis e credenciais. Controla o acesso via tipos (`ADMIN` vinculado a um CD, ou `DOADOR`).
  - **centros_distribuicao:** Cadastro dos pontos de apoio com dados de localização e responsáveis.
  - **categorias:** Tabela de segmentação (ex: Higiene, Alimento, Limpeza) para organização do inventário.
  - **necessidades:** O coração do sistema. Controla `quantidade_atual` vs `quantidade_objetivo`.
  - **Status Dinâmico:** Gerenciado automaticamente entre `ATIVO` e `CONCLUIDO`.
  - **Lógica de Prioridade:**
    - 🔴 **CRÍTICA:** Menos de 20% da meta atingida.
    - 🟠 **ALTA:** Entre 20% e 50% da meta atingida.
    - 🟡 **MÉDIA:** Entre 50% e 80% da meta atingida.
    - 🟢 **BAIXA:** Acima de 80% da meta atingida.
- **registro_doacoes:** Histórico e rastreabilidade de todas as intenções de doação, logs de entrega e validação de estoque.
      

---

##  5. 🚀 Como consumir a API

- **API (Render):** [https://conecta-ajuda-backend.onrender.com/](https://conecta-ajuda-backend.onrender.com/)

---

## 6. 📚 Documentação da API

- **Documentação (Postman):** [Acessar Documenter](https://documenter.getpostman.com/view/19569624/2sBXqGrMUn/)

## 💻 7. Como Executar o Projeto

```

 **Clone o repositório:**
 
   ```bash
   git clone [https://github.com/RaizerTechDev/conecta-ajuda-frontend.git](https://github.com/RaizerTechDev/conecta-ajuda-frontend.git)

## Instalar dependências
npm install

## Inicie o ambiente de desenvolvimento:
npm run dev

```

---

<br>

### Licença

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

</br> 

## 👨‍💻 Autor

<table>
<tr>
  <td align="center">
    <img src="https://avatars.githubusercontent.com/u/87991807?v=4" width="80" />
  </td>
  <td>
    **RafaRaizer-Dev** <br>
    <a href="https://api.whatsapp.com/send/?phone=47999327137">📱 WhatsApp</a> | 
    <a href="https://www.linkedin.com/in/raizer-rafael/">💼 LinkedIn</a> | 
    <a href="https://github.com/RaizerTechDev">🐱 GitHub</a> | 
    <a href="https://raizertechdev-portfolio.netlify.app/">🌐 Portfólio</a>
  </td>
</tr>
</table>

<br>

<div align="center">
