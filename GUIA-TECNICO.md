# 🏗️ Garcia Construções — Guia Técnico de Implantação

> Passo a passo para o proprietário hospedar, atualizar e gerenciar o site **sem precisar de programador**.

---

## 📁 ESTRUTURA DE ARQUIVOS

```
garcia-construcoes/           ← pasta raiz do projeto
├── index.html                ← página principal (não mexer)
├── obras.json                ← ✅ AQUI você adiciona fotos e vídeos
├── src/
│   └── imagens/              ← ✅ AQUI você coloca os arquivos de mídia
│       ├── foto(1).png
│       ├── video-obras.mp4
│       └── ... (suas fotos e vídeos)
└── admin/                    ← painel CMS (opcional, ver Passo 3)
    └── index.html
```

---

## 🚀 PASSO 1 — HOSPEDAGEM GRATUITA NO NETLIFY

O Netlify oferece hospedagem gratuita, HTTPS automático e CDN global.

### Como fazer:

1. **Crie conta gratuita** em [netlify.com](https://netlify.com)

2. **Suba o site** — duas opções:

   **Opção A (mais fácil) — arrastar e soltar:**
   - No painel Netlify, clique em **"Add new site → Deploy manually"**
   - Arraste a pasta `garcia-construcoes/` inteira para a área indicada
   - Aguarde. Em 1 minuto seu site estará em algo como `garcia-construcoes.netlify.app`

   **Opção B (recomendada para atualizações fáceis) — GitHub:**
   - Crie conta em [github.com](https://github.com)
   - Crie um repositório chamado `garcia-construcoes`
   - Faça upload de todos os arquivos
   - No Netlify: **"Add new site → Import from Git"** → conecte o GitHub
   - Toda vez que você atualizar o GitHub, o site atualiza automaticamente ✅

3. **Domínio personalizado (opcional):**
   - Em "Domain settings" no Netlify, adicione `garciaconstrucoes.com.br`
   - Siga as instruções DNS (o Netlify guia passo a passo)
   - Custo: ~R$ 40/ano para o domínio. Hospedagem = **gratuita para sempre**

---

## 🖼️ PASSO 2 — COMO ADICIONAR FOTOS (SEM CMS)

Esta é a forma mais simples. Funciona assim:

### Para adicionar uma foto nova:

1. **Coloque o arquivo** na pasta `src/imagens/`
   - Nomeie o arquivo sem espaços e acentos: `obra-nova-2024.jpg` ✅
   - Evite: `foto obra nova (1).jpg` ❌

2. **Abra o arquivo `obras.json`** com qualquer editor de texto (até o Bloco de Notas)

3. **Copie um bloco existente** e cole antes do `]` final:

```json
  {
    "type": "foto",
    "src": "src/imagens/obra-nova-2024.jpg",
    "title": "Nome da Obra — Descrição",
    "categoria": "residencial"
  },
```

4. **Salve** o arquivo e faça upload no Netlify/GitHub

> ✅ A foto vai aparecer automaticamente na galeria do site!

### Para adicionar um vídeo:

```json
  {
    "type": "video",
    "src": "src/imagens/meu-video.mp4",
    "title": "Vídeo da Obra 2024",
    "categoria": "video"
  },
```

> ⚠️ **Dica:** Vídeos grandes deixam o site lento. Para vídeos longos, prefira hospedar no **YouTube** e usar o link do YouTube no campo `"src"`.

---

## 🎛️ PASSO 3 — PAINEL ADMINISTRATIVO COM DECAP CMS (avançado)

O **Decap CMS** (antes chamado Netlify CMS) permite editar o site por um painel visual, sem tocar em código ou JSON. Perfeito para o proprietário.

### Como configurar:

**1. Crie a pasta `admin/` na raiz do projeto com 2 arquivos:**

`admin/index.html`:
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Painel Garcia Construções</title>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</head>
<body></body>
</html>
```

`admin/config.yml`:
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "src/imagens"
public_folder: "/src/imagens"

collections:
  - name: "obras"
    label: "Obras / Galeria"
    files:
      - label: "Lista de Obras"
        name: "obras"
        file: "obras.json"
        fields:
          - label: "Obras"
            name: ""
            widget: "list"
            fields:
              - { label: "Tipo", name: "type", widget: "select", options: ["foto", "video"] }
              - { label: "Arquivo", name: "src", widget: "image" }
              - { label: "Título", name: "title", widget: "string" }
              - { label: "Categoria", name: "categoria", widget: "select",
                  options: ["residencial", "comercial", "estrutura", "acabamento", "video"] }
```

**2. No Netlify, ative o Identity e Git Gateway:**
- Vá em **Site settings → Identity → Enable Identity**
- Em **Services → Git Gateway → Enable**
- Em **Identity → Registration → Invite only** (para segurança)
- Convide seu próprio e-mail

**3. Acesse o painel:**
- URL: `seusite.netlify.app/admin`
- Faça login com o e-mail convidado
- Agora você tem um painel para adicionar/remover fotos clicando em botões! ✅

---

## 📱 HERO SLIDER — Como trocar as fotos de destaque

As 3 fotos principais que aparecem na tela de entrada estão no `index.html`, nas linhas:

```html
<div class="hero-slide active"
     style="background-image: url('src/imagens/novas (5).png')">
```

Troque o caminho dentro de `url('...')` para o arquivo da sua foto preferida.

---

## 🔧 DICAS TÉCNICAS

| Item | Recomendação |
|------|-------------|
| Formato de fotos | `.jpg` ou `.webp` (menor tamanho, boa qualidade) |
| Tamanho ideal | Max 800KB por foto |
| Resolução | 1920×1080px ou 1200×900px |
| Formato de vídeo | `.mp4` com H.264 |
| Tamanho de vídeo | Max 50MB (prefira YouTube para vídeos longos) |

### Ferramenta gratuita para compactar fotos antes de subir:
- [squoosh.app](https://squoosh.app) — online, fácil, sem instalar nada

---

## 💰 RESUMO DE CUSTOS

| Item | Custo |
|------|-------|
| Hospedagem Netlify | **Gratuito** |
| HTTPS (SSL) | **Gratuito** |
| Decap CMS | **Gratuito** |
| GitHub | **Gratuito** |
| Domínio `.com.br` (opcional) | ~R$ 40/ano |
| **Total mínimo** | **R$ 0/mês** |

---

## 🆘 SUPORTE RÁPIDO

Problema | Solução
---------|--------
Foto não aparece | Verifique se o nome no JSON é **idêntico** ao nome do arquivo (incluindo maiúsculas)
Site não atualiza | No Netlify, clique em "Trigger deploy"
Vídeo não carrega | Comprima o vídeo ou suba no YouTube e cole o link
Erro no JSON | Valide em [jsonlint.com](https://jsonlint.com) — copie e cole o conteúdo do obras.json
