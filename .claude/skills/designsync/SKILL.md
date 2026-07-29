---
name: designsync
description: Sincroniza o site com a referência de design em design-reference/ — lê o protótipo aprovado (opção 2a), compara com o código atual do site e aplica as diferenças em index.html/styles.css/app.js, mantendo as regras do CLAUDE.md.
argument-hint: "[seção ou 'tudo'] (ex.: produtos, comparador, hero, tudo)"
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

# /designsync — trazer o design para o código

Alvo desta rodada: **$ARGUMENTS** (se vazio, considere `tudo`).

## Contexto obrigatório antes de mexer em qualquer arquivo

1. Leia `CLAUDE.md` (regras de estilo e armadilhas conhecidas).
2. Leia `docs/HANDOFF.md` (ou `README.md` do handoff) — é a especificação da home:
   seções em ordem, tokens, medidas, dados dos casos de antes/depois.
3. Leia `design-reference/Dan Shira Home.dc.html` e trabalhe **apenas** com o bloco
   `id="2a"` (opção "Oficina", a aprovada). Ignore `1a`, `1b`, `1c` — são histórico.
   Dentro do `2a` existem dois mocks: `data-screen-label="2a Desktop"` (largura 900px) e
   `data-screen-label="2a Mobile"` (390px).
4. Veja o estado atual do repo: `!git log --oneline -5` e `!ls -1`.

## O que fazer

- Se `index.html` ainda é o **stub** ("Site em construção"): substitua o conteúdo e crie o
  site de verdade — `index.html`, `style.css` e `app.js` na raiz (mantenha o nome
  `style.css`, que é o que já existe no repo `dkamioka/danshira`), sem framework e sem
  `support.js`. Layout fluido de 360px a 1920px: o mock de 900px é a referência desktop, o
  de 390px a mobile, e os breakpoints intermediários saem por interpolação (grades de 4–5
  colunas → 2 → 1). Um `.nojekyll` vazio na raiz.
- Se já existe um site real: faça um **diff conceitual** entre o protótipo e o código, seção
  por seção (header, hero, faixa de números, antes/depois, caminho da peça, produtos,
  marcenaria, CTA/rodapé). Liste as diferenças encontradas antes de editar, e depois aplique
  **só** as da seção pedida em `$ARGUMENTS`.
- Copie os valores exatos do protótipo: hex, tamanhos de fonte, letter-spacing, paddings e
  a copy em pt-BR. Não "melhore" texto nem cor por conta própria.
- Assets ficam em `assets/`. Nunca referencie nada de fora do repo.

## Regras que não podem ser quebradas

- **Comparador antes/depois**: auto-play em CSS (`@keyframes dsWipe`, 9s, `ease-in-out`,
  `infinite`), nunca em `requestAnimationFrame`. A linha de 2px e a bolinha `↔` são
  **filhas da máscara**, ancoradas em `right:-1px` — duas animações separadas
  dessincronizam. No `pointerdown`: `style.animation='none'` e o arraste passa a escrever
  `style.width`, com clamp de 1.5% a 98.5% e `setPointerCapture`.
- **Base de corte** (fundo verde `#1E2B22` com grade 28px/140px e régua no topo) é motivo
  de marca: aparece nas seções de produtos e marcenaria. Não substituir por cor lisa.
- Sem cantos arredondados (exceto a bolinha do comparador), sem gradiente decorativo, sem
  emoji, sem sombra.
- Placeholders de revenda mantêm a tarja `IMAGEM PROVISÓRIA` até existir foto real.
- Tipografia: Archivo (400–800) + IBM Plex Mono, via Google Fonts.

## Fotos novas em assets/

Se apareceram fotos novas de antes/depois, normalize cada par para **820×820** no mesmo
padrão do resto (a própria foto em `cover` com `blur(26–30px) brightness(.45)` como fundo,
e a foto nítida em `contain` a 99% por cima), salve como
`assets/ba/<slug>-antes.png` / `-depois.png` e registre o caso na lista de dados do
comparador (peça, serviço, etapa, resumo, nota, ângulos).

## Ao terminar

1. Rode uma verificação rápida: nenhuma imagem 404, nenhum erro de console.
2. Resuma em 3–5 linhas o que mudou.
3. `git add -A && git commit -m "designsync: <resumo>"` e informe se devo dar `push`
   (o push na `main` de `dkamioka/danshira` republica em
   https://dkamioka.github.io/danshira/).
