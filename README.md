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
- **Funcionalidades:** - Dashboard de visualização de necessidades.
    - Barra de progresso dinâmica por item.
    - Filtros por categoria e nível de prioridade.
    - Registro de intenção de doação.
    - Design responsivo focado em usabilidade móvel.

### ⚙️ Back-end
- **Tecnologias:** `Node.js`, `Express` e `node-postgres (PG)`.

- **Funcionalidades:**
    - API RESTful para gestão de centros e necessidades.
    - Endpoints para atualização rápida de estoque.
    - Lógica automatizada: ao confirmar entrega, o sistema incrementa o inventário da necessidade vinculada.

- **Repositório:** [Conecta Ajuda Backend](https://github.com/RaizerTechDev/conecta-ajuda-backend)

### 🗄️ Banco de Dados (PostgreSQL)
- **usuarios:** Controle de acesso (Admin/Doador).
- **centros_distribuicao:** Cadastro de pontos de apoio e localização.
- **categorias:** Segmentação de itens (Higiene, Alimento, etc).
- **necessidades:** Tabela dinâmica que controla `quantidade_atual` vs `objetivo`.
- **Regras de Prioridade:**
    - 🔴 **CRÍTICA (< 20%)** | 🟠 **ALTA (20-50%)** | 🟡 **MÉDIA (50-80%)** | 🟢 **BAIXA (> 80%)**
- **registro_doacoes:** Logs de doações pendentes e entregues.

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
