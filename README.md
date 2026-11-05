# Lentes de Contato Dental — Dr. Carlos Magalhães

Landing page estática (HTML/CSS/JS puro, sem build) para o site do Dr. Carlos Magalhães, cirurgião-dentista especializado em lentes de contato dental e laminados cerâmicos, atendendo em Cruzeiro do Sul e região do Vale do Juruá (AC).

## Estrutura

```
deploy/
├── index.html
├── robots.txt
├── sitemap.xml
├── vercel.json
└── assets/
    ├── cases/     # fotos de antes/depois
    ├── css/       # estilos
    ├── fonts/     # Bodoni e Manrope (woff2)
    ├── img/       # imagens gerais
    ├── js/        # script principal
    └── videos/    # vídeo hero e vídeos de reveal
```

## Deploy na Vercel

Site 100% estático — não requer build. A partir desta pasta (`deploy/`):

```bash
vercel --prod
```

Alternativa: subir este conteúdo para um repositório Git e importar o projeto no painel da Vercel.

## Configuração

- `vercel.json` define `cleanUrls`, desativa trailing slash e aplica cache de 1 ano (`immutable`) para os arquivos em `/assets/`.
- `robots.txt` e `sitemap.xml` apontam para `https://www.drcarlosmagalhaes.com.br/`.

## Domínio

Domínio de produção: **drcarlosmagalhaes.com.br**
