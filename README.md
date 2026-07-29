# Handoff — Site Dan Shira Craftsman (home)

## Visão geral
Site institucional do ateliê **Dan Shira Craftsman** (Jabaquara, São Paulo): manutenção,
reforma e restauração de luvas de beisebol/softbol, venda de produtos do ateliê
(cinto de couro, creme condicionador, protetores) e marcenaria sob encomenda
(expositores, suportes, bases gravadas a fogo). Objetivo comercial: gerar conversa no
WhatsApp com orçamento.

## Sobre os arquivos deste pacote
Os arquivos em `design-reference/` são **referência de design feita em HTML** — um
protótipo que mostra aparência e comportamento pretendidos, **não** código de produção
para copiar direto. `Dan Shira Home.dc.html` é um *canvas de design*: contém 4 propostas
lado a lado, em larguras fixas (mock desktop de 900px e mock mobile de 390px).

**A direção aprovada é a `2a` ("Oficina")** — a primeira do arquivo. As opções `1a`, `1b`
e `1c` são histórico e podem ser descartadas.

O arquivo depende de `support.js` (runtime do editor de design). O site de produção **não
deve** depender dele.

### Primeira tarefa sugerida ao Claude Code
Recriar a opção `2a` como **um site estático responsivo** (`index.html` + CSS, sem
framework, ou o stack que preferir), fluido de 360px a 1920px, publicável no GitHub Pages:

- o mock de 900px representa o layout desktop; o de 390px, o mobile. Entre os dois,
  interpolar (grades de 4/5 colunas viram 2 colunas em tablet, 1 em mobile);
- tipografia e cores exatamente como especificado abaixo;
- copy em pt-BR exatamente como está no protótipo (estrutura já preparada para um
  segundo idioma: es-419 no futuro);
- `index.html` na raiz do repositório para o GitHub Pages servir direto.

## Fidelidade
**Hi-fi.** Cores, tipografia, espaçamentos, copy e interações são finais. Recriar
fielmente.

## Estrutura da página (opção 2a, na ordem)

1. **Header** — barra fixa opcional. Logo `assets/logo-lockup-dark.png` (altura 38px
   desktop / 26px mobile), nav (Serviços · Trabalhos · Produtos · Cuidados) e botão
   "Orçamento" em `#A8462F`. Borda inferior `1px rgba(237,231,219,.14)`.
2. **Hero** — foto da bancada full-bleed (`assets/bancada-hero.png`), altura 620px
   desktop / 460px mobile, `background-position: 45% 38%`, com gradiente
   `linear-gradient(180deg, rgba(22,18,15,.55), rgba(22,18,15,.35) 40%, rgba(22,18,15,.96))`.
   Eyebrow mono + traço de 28px, título "SUA LUVA NOVA DE NOVO" (Archivo 800, 84px
   desktop / 50px mobile, `line-height:.88`, `letter-spacing:-.03em`), parágrafo e dois
   botões (primário terracota, secundário com borda).
3. **Faixa de números** — 3 colunas divididas por bordas: "8 ANOS / DE BANCADA",
   "BRASIL / RECEBO E DEVOLVO POR ENVIO", "1 A 1 / SEM LINHA DE PRODUÇÃO".
4. **O antes e o depois** — comparador interativo (ver seção "Comparador" abaixo).
5. **O caminho da peça** — 3 linhas em grade `120px 1fr 1fr`: 01 Revisão, 02 Reforma,
   03 Restauração (o número da 03 em `#A8462F`).
6. **Produtos do ateliê** — sobre a **base de corte** (ver seção abaixo). Grade
   `1.55fr 1fr 1fr`: card grande do cinto (foto 4:3), creme condicionador, e coluna com
   "Cores" + "Gravação". Abaixo, grade de 5: protetor de dedos (foto real) e 4 itens de
   **revenda** com `IMAGEM PROVISÓRIA` (substituir quando houver foto real).
7. **Couro e madeira (marcenaria)** — mesma base de corte, separada por borda superior.
   Texto + 4 chips + grade `1.15fr 1fr 1fr` com linhas de 196px: expositor com cúpula
   (ocupa 2 linhas), suporte home plate, marca a fogo, base com berço, na bancada.
8. **CTA final** — "MANDA UMA FOTO DA SUA LUVA", oni completo colorido
   (`assets/mark-color.png`, 100px), botão com o telefone (link `wa.me`), Instagram e
   endereço. No mobile, barra fixa inferior terracota "WHATSAPP / CHAMAR AGORA".

## Comparador antes/depois (a peça central)

Comportamento:
- **Auto-play**: a máscara do "depois" varre a peça sozinha, em loop, com pausa nas
  pontas. Implementado em **CSS** (não em `requestAnimationFrame` — em documento oculto
  o rAF congela):

```css
@keyframes dsWipe { 0%, 7% { width: 6%; } 50%, 57% { width: 94%; } 100% { width: 6%; } }
/* elemento: animation: dsWipe 9s ease-in-out infinite; */
```

- **A linha vertical (2px `#A8462F`) e a bolinha `↔` (46px) são filhas da própria máscara**,
  ancoradas em `right:-1px`. Isso é importante: duas animações separadas (uma para a
  largura, outra para o `left` da linha) **dessincronizam**. Uma animação só.
- **Arraste assume o controle**: no `pointerdown` o código faz
  `el.style.animation = 'none'` e passa a escrever `el.style.width = pct` a partir de
  `clientX` relativo ao `getBoundingClientRect()` do container (clamp 1.5%–98.5%).
  `setPointerCapture` no container; `touch-action: none; user-select: none;`.
- A legenda muda de `▶ COMPARANDO SOZINHO · ARRASTE PARA ASSUMIR` para
  `ARRASTE A LINHA PARA COMPARAR` depois da primeira interação.
- **Abas de caso** (4) e **miniaturas de ângulo** trocam as duas fotos. Os `src` são
  escritos por referência ao DOM para não haver flash/404 durante o carregamento.

Dados (4 casos, 13 pares — arquivos em `assets/ba/`):

| Caso | Peça | Serviço | Ângulos (`slug`) |
|---|---|---|---|
| 041 | Rawlings 11.75" infield | Restauração completa | `raw-5` DORSO, `raw-4` PALMA, `raw-2` DEDOS, `raw-3` WEB, `raw-1` LATERAL, `raw-6` TOPO |
| 038 | ZETT Dyna 1ª base | Reforma e recoloração | `zett-1` FRENTE, `zett-2` DORSO, `zett-3` LATERAL, `zett-4` BOLSO |
| 044 | Mizuno Pro couro vermelho | Correção de estrutura | `miz-1` TOPO, `miz-2` BOLSO |
| 047 | Luva de rebatida couro preto | Reconstrução total | `bat-1` PALMA |

Cada par tem os arquivos `assets/ba/<slug>-antes.png` e `assets/ba/<slug>-depois.png`,
**todos 820×820**. No caso 044 as fotos têm marcação: linha vermelha = forma cedida,
linha verde = forma recuperada (a nota do caso explica isso).

## Base de corte (motivo visual)
Fundo verde-escuro de *cutting mat* de marcenaria/couro, com grade fina de 28px, grade
forte de 140px e uma régua com marcações no topo (28px de altura). Usado nas seções de
produtos e marcenaria:

```css
background: #1E2B22;
background-image:
  repeating-linear-gradient(0deg,  rgba(206,228,212,.13) 0 1px, transparent 1px 28px),
  repeating-linear-gradient(90deg, rgba(206,228,212,.13) 0 1px, transparent 1px 28px),
  repeating-linear-gradient(0deg,  rgba(206,228,212,.26) 0 1px, transparent 1px 140px),
  repeating-linear-gradient(90deg, rgba(206,228,212,.26) 0 1px, transparent 1px 140px);
/* régua: rgba(0,0,0,.4) + repeating-linear-gradient(90deg, rgba(206,228,212,.55) 0 1px, transparent 1px 14px) */
```
No mobile a grade cai para 24px / 120px e a régua para 24px.

## Design tokens

Cores
| Token | Hex | Uso |
|---|---|---|
| Preto couro | `#16120F` | fundo principal, cards |
| Preto couro 2 | `#1D1714` | faixas alternadas |
| Base de corte | `#1E2B22` | fundo das seções de produto/marcenaria |
| Creme | `#EDE7DB` | texto principal |
| Terracota | `#A8462F` | ação, linha do comparador, destaques |
| Terracota clara | `#C99A80` | eyebrows, notas |
| Verde-menta | `#C4D8C9` | rótulos sobre a base de corte |
| Grade da base | `rgba(206,228,212,.13/.26)` | linhas do mat |
| Oliva (logo) | `#3F4A3A` | wordmark original |
| Ameixa (logo) | `#43263A` | "CRAFTSMAN", detalhes do oni |

Texto secundário: `rgba(237,231,219,.72)`; bordas: `rgba(237,231,219,.14–.16)` no escuro e
`rgba(206,228,212,.16)` sobre o mat.

Tipografia
- **Archivo** 400/600/700/800 — títulos em caixa-alta (`letter-spacing:-.02/-.03em`) e
  corpo (15–16px, `line-height:1.6`).
- **IBM Plex Mono** 400/500 — rótulos técnicos, 9–11px, `letter-spacing:.12–.2em`, caixa-alta.
- Instrument Serif aparece só na opção 1a (descartada).
- Google Fonts: `Archivo:wght@400;500;600;700;800`, `IBM+Plex+Mono:wght@400;500`.

Espaçamento: seções `76px 44px` (desktop) / `28px 20px` (mobile); gaps de grade 12px;
cantos **retos** (sem border-radius, exceto a bolinha do comparador e o mock de celular);
sem sombras internas — o design usa borda e contraste.

## Assets
- `assets/logo-lockup.png` — lockup original (oni cortado ao meio + wordmark oliva/ameixa), para fundo claro.
- `assets/logo-lockup-dark.png` — **usado no header**: mesmo lockup com wordmark creme e "CRAFTSMAN" em terracota clara, oni clareado para ler no escuro. Gerado por recolorização do original.
- `assets/mark-color.png` — oni completo colorido (rodapé). `assets/mark-white.png` — oni monocromático.
- `assets/ba/*` — 26 fotos do comparador, 820×820.
- `assets/prod/*` — fotos de produto e marcenaria; `mock-*.png` são **provisórias** (fundo desfocado da bancada com o oni em marca-d'água) para cola spray, cinto elástico, protetor de punho e protetor de garganta.
- `assets/bancada-hero.png` — foto do hero.

**Pipeline das fotos**: todas as fotos vieram de screenshots do Instagram, em tamanhos
diferentes. Cada uma foi normalizada em canvas: a própria foto desenhada em `cover`,
`blur(26–30px) brightness(.45)` como fundo, e a foto nítida em `contain` (99%) por cima.
Resultado: enquadramento idêntico entre antes/depois sem cortar a peça. Para novos pares,
repetir o processo com o mesmo tamanho final (820×820).

**Falta (pedir ao cliente)**: fotos reais dos 4 itens de revenda, fotos das peças de
marcenaria adicionais, retrato do Danilo, depoimentos, logos de times, preços e o
arquivo vetorial (SVG/AI) do logo — os PNGs atuais são recortes de bitmap.

## Deploy no GitHub Pages
Ver `SYNC.md` neste pacote.

## Arquivos
- `design-reference/Dan Shira Home.dc.html` — canvas de design (opção 2a no topo).
- `design-reference/support.js` — runtime do protótipo (não vai para produção).
- `assets/` — todos os assets prontos para uso.
- `CLAUDE.md` — contexto do projeto para o Claude Code (colocar na raiz do repo).
