# 🎡 Roleta da Sorte Literária

Roleta da sorte interativa com 7 gêneros literários: **Romance, Suspense, Comédia, Terror, Fantasia, Drama e Ação**.

Gire a roleta e descubra qual gênero vai guiar sua próxima leitura!

---

## 🚀 Publicar na Vercel — Passo a Passo (SEM terminal)

Siga exatamente estes passos. Você só precisa de um navegador e uma conta de email.

### Passo 1 — Criar conta no GitHub

1. Acesse **https://github.com/signup**
2. Preencha seu email, crie uma senha e um nome de usuário
3. Confirme o email (o GitHub manda um código)
4. Pronto, você está logado no GitHub ✅

---

### Passo 2 — Criar o repositório

1. Acesse **https://github.com/new**
2. Em **Repository name**, digite:
   ```
   roleta-da-sorte-literaria
   ```
3. Selecione **Public**
4. ⚠️ **IMPORTANTE:** Deixe TODAS as caixinhas desmarcadas:
   - ❌ NÃO marque "Add a README file"
   - ❌ NÃO marque "Add .gitignore"
   - ❌ NÃO marque "Choose a license"
5. Clique no botão verde **"Create repository"**

---

### Passo 3 — Subir os arquivos

1. Na página que abre depois de criar o repositório, procure o link cinza pequeno:
   ```
   uploading an existing file
   ```
   (Fica logo abaixo das instruções em azul)
2. Clique nele
3. Agora abra a pasta `roleta-da-sorte-literaria` que você baixou no seu computador
4. Selecione **TUDO** que tem dentro dela:
   - 📄 `.gitignore`
   - 📄 `README.md`
   - 📄 `eslint.config.mjs`
   - 📄 `next.config.ts`
   - 📄 `package.json`
   - 📄 `postcss.config.mjs`
   - 📄 `tsconfig.json`
   - 📄 `vercel.json`
   - 📁 `src/` (a pasta inteira)
5. Arraste tudo para a caixa do GitHub (onde diz "Drag files here...")
6. Role até embaixo, escreva qualquer coisa no campo "Commit message" (ex: `meu projeto`)
7. Clique no botão verde **"Commit changes"**

> ⚠️ **ATENÇÃO:** Se aparecer uma pasta `node_modules` dentro da sua pasta do projeto, **NÃO arraste ela** — é pesada e quebra o build. Arraste apenas os arquivos listados acima.

---

### Passo 4 — Criar conta na Vercel

1. Acesse **https://vercel.com/signup**
2. Clique em **"Continue with GitHub"** (recomendado — já conecta as duas contas)
3. Autorize a Vercel a acessar sua conta GitHub
4. Preencha seu nome e o que te pedirem
5. Quando aparecer "What would you like to do?", clique em **"Skip"** (pode pular)

---

### Passo 5 — Importar o repositório

1. Acesse **https://vercel.com/new**
2. Você verá a seção **"Import Git Repository"**
3. Se aparecer uma mensagem pedindo para instalar a Vercel no GitHub:
   - Clique em **"Install Vercel for GitHub"**
   - Selecione **"All repositories"** (ou só seu repositório `roleta-da-sorte-literaria`)
   - Clique em **"Install"**
4. Volte para https://vercel.com/new
5. Seu repositório `roleta-da-sorte-literaria` vai aparecer na lista
6. Clique em **"Import"** ao lado dele

---

### Passo 6 — Configurar e Deploy

Na tela de configuração que abrir:

1. **Project Name:** pode deixar como está (ou mude se quiser)
2. **Framework Preset:** deve aparecer **"Next.js"** automaticamente. Se aparecer outra coisa, clique e selecione **"Next.js"**
3. **Root Directory:** deixe em branco / default
4. **Build Command:** deixe como `next build` (default)
5. **Output Directory:** deixe como `.next` (default)
6. **Install Command:** deixe como `npm install` (default)
7. ⚠️ **NÃO mexa em mais nada**
8. Clique no botão azul **"Deploy"**

---

### Passo 7 — Aguardar e pegar o link 🎉

1. A Vercel vai mostrar uma tela com **logs de build** rodando
2. Demora de **2 a 4 minutos**
3. Quando aparecer **"Congratulations!"** com confetes 🎉
4. Seu link permanente está pronto! Será algo como:
   ```
   https://roleta-da-sorte-literaria-xxxxx.vercel.app
   ```
5. Clique em **"Visit"** para testar
6. Salve esse link e compartilhe com quem quiser! 📲

---

## 🔄 Como fazer alterações depois

Editou o código e quer atualizar o site? **A Vercel atualiza sozinha!**

1. Vá no GitHub, no seu repositório `roleta-da-sorte-literaria`
2. Navegue até o arquivo que quer mudar
3. Clique no lápis ✏️ no canto direito superior
4. Faça a alteração
5. Clique em **"Commit changes..."**
6. Em 1-2 minutos, a Vercel re-deploy automático e o link fica atualizado ✨

---

## 🆘 Troubleshooting — Problemas comuns

### ❌ "Cannot find module 'next'"
**Causa:** Falta rodar `npm install`. Como estamos usando Vercel, ela instala automaticamente — você não precisa fazer nada.

### ❌ Erro `[BUILD_UTILS_SPAWN_1]` no build
**Causa provável:** Você subiu pelo upload direto da Vercel em vez do GitHub.
**Solução:** Refaça seguindo o passo a passo acima — suba primeiro no GitHub (Passos 2 e 3), depois importe na Vercel.

### ❌ "Failed to install dependencies"
**Causa:** Algo no `package.json` está conflitando. O `package.json` que te enviei já está testado — então só refaça o upload e tente de novo.

### ❌ Build demora demais ou trava
**Solução:** Cancele o deploy, vá no GitHub, certifique-se de que **não tem** pasta `node_modules` ou `.next` no repositório. Essas pastas devem estar no `.gitignore` (que já incluí no projeto).

### ❌ Site abre mas fica em branco
**Causa:** Pode ser cache do navegador.
**Solução:** Aperte `Ctrl+F5` (ou `Cmd+Shift+R` no Mac) para recarregar sem cache.

---

## 📂 Estrutura do projeto

```
roleta-da-sorte-literaria/
├── .gitignore              ← Diz ao GitHub quais pastas ignorar
├── README.md               ← Este arquivo
├── eslint.config.mjs       ← Configuração ESLint
├── next.config.ts          ← Configuração Next.js
├── package.json            ← Dependências do projeto
├── postcss.config.mjs      ← Configuração Tailwind CSS
├── tsconfig.json           ← Configuração TypeScript
├── vercel.json             ← ⭐ Configuração explícita para Vercel
└── src/
    ├── app/
    │   ├── layout.tsx       ← Layout + Google Fonts
    │   ├── page.tsx         ← Página principal (roleta + lógica + UI)
    │   └── globals.css      ← Estilos premium + animações
    ├── components/
    │   ├── ornament.tsx     ← SVGs decorativos
    │   └── ui/
    │       ├── button.tsx
    │       ├── toast.tsx
    │       └── toaster.tsx
    ├── hooks/
    │   └── use-toast.ts
    └── lib/
        └── utils.ts
```

---

## 🎨 Stack técnica

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript 5
- **Estilo:** Tailwind CSS 4
- **UI:** shadcn/ui (New York style)
- **Fontes:** Google Fonts (Playfair Display, Cormorant Garamond, Inter)
- **Confete:** canvas-confetti

---

## 📞 Precisa de ajuda?

Se algo der errado:
1. Tire uma **screenshot** da tela com erro
2. **Expanda os logs** (clicando na setinha ao lado de "Build Logs")
3. Me mande a screenshot que eu te ajudo!

Bom deploy! 🎡✨
