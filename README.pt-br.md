# Meu Portfolio

📖 [English version here](README.md)

🏗️ **Nota:** Este é o código do front-end da aplicação. A infraestrutura AWS (Terraform e Ansible) para este projeto é gerenciada em um repositório separado aqui: [github.com/Maschior/portfolio](https://github.com/Maschior/portfolio).

---

Bem-vindo ao repositório do meu site de portfólio pessoal. Esta é uma aplicação web moderna, responsiva e totalmente localizada (i18n) construída com Next.js 15, Tailwind CSS e Framer Motion.

## 🚀 Demonstração ao Vivo
Você pode acessar meu portfólio online em: [maschior.com](https://maschior.com)

## ✨ Funcionalidades
- **Suporte Bilíngue (i18n):** Roteamento e tradução de conteúdo completos para inglês e português via `next-intl`.
- **UI/UX Moderna:** Construída com tipografia elegante, cartões de componentes personalizados e um layout limpo.
- **Animações Fluidas:** Microinterações suaves e revelações de rolagem alimentadas por `framer-motion`.
- **Design Responsivo:** Otimizado para todos os tamanhos de tela (mobile, tablet, desktop).
- **SEO & Dados Estruturados:** Elementos HTML5 semânticos e metadados JSON-LD do schema.org para otimização de visibilidade em mecanismos de busca.

## 🛠️ Stack Tecnológica
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Localização:** [next-intl](https://next-intl.dev/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Gerenciador de Pacotes:** `pnpm`

## 📁 Estrutura de Diretórios
```bash
portfolio-webapp/
├── messages/            # Arquivos JSON de i18n (en.json, pt.json)
├── public/              # Ativos estáticos (imagens, foto de perfil)
├── src/
│   ├── app/             # Next.js App Router (roteamento de localidade)
│   │   └── [locale]/    # Páginas localizadas (home, about, contact)
│   ├── components/      # Componentes de UI (Badge, Button, Avatar)
│   ├── lib/             # Wrappers de navegação e auxiliares de metadados estruturados
│   └── styles/          # Globais de Tailwind e CSS
├── package.json         # Scripts e dependências
└── tailwind.config.ts   # Definições de tema personalizado
```

## 💻 Desenvolvimento Local

Siga as instruções abaixo para executar este projeto localmente:

### 1. Pré-requisitos
Certifique-se de ter o **Node.js (>=22)** e o **pnpm** instalados.

### 2. Instalação
Clone este repositório e instale as dependências:
```bash
git clone https://github.com/Maschior/portfolio-webapp.git
cd portfolio-webapp
pnpm install
```

### 3. Executar o Servidor de Desenvolvimento
Inicie o servidor de desenvolvimento do Next.js:
```bash
pnpm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 4. Compilar para Produção
Para compilar a aplicação:
```bash
pnpm run build
pnpm run start
```
