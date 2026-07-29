# Dan Shira Craftsman — site

Site estático (HTML/CSS/JS, sem framework) do ateliê Dan Shira Craftsman: restauração de
luvas de beisebol/softbol, produtos do ateliê e marcenaria sob encomenda. Publicado no
GitHub Pages. Idioma: pt-BR (estrutura preparada para es-419 depois).

## Regras de estilo
- Direção visual: "Oficina" — fundo escuro `#16120F`, texto creme `#EDE7DB`, ação
  terracota `#A8462F`. Sem gradientes decorativos, sem cantos arredondados, sem emoji.
- Tipografia: **Archivo** (400–800) para títulos caixa-alta e corpo; **IBM Plex Mono**
  para rótulos técnicos (9–11px, caixa-alta, letter-spacing alto).
- Seções de produto e marcenaria ficam sobre a "base de corte": fundo `#1E2B22` com grade
  de 28px/140px e régua no topo. Esse é um motivo de marca — manter.
- Copy em português direto, primeira pessoa do Danilo, sem jargão de marketing.
- Sempre usar flex/grid com `gap` em grupos de elementos.

## Comparador antes/depois
- Auto-play em **CSS** (`@keyframes dsWipe`, 9s, `ease-in-out`), nunca em
  `requestAnimationFrame` (congela em documento oculto).
- A linha e a bolinha `↔` são **filhas da máscara** (`right:-1px`) — não animar a linha
  separadamente, dessincroniza.
- No `pointerdown`: `style.animation='none'` e passa a controlar `style.width` pelo mouse.
- Fotos: pares `assets/ba/<slug>-antes.png` / `-depois.png`, 820×820. Novos pares devem
  ser normalizados no mesmo formato (fundo = a própria foto desfocada e escurecida).

## O que está pendente
Fotos reais dos itens de revenda, mais peças de marcenaria, depoimentos, preços, retrato
do Danilo e o logo em vetor (SVG). Placeholders de revenda levam a tarja
`IMAGEM PROVISÓRIA` — não remover a tarja antes de trocar a foto.

## Contato/CTA
WhatsApp `+55 11 91753-8155` → `https://wa.me/5511917538155`. Instagram
`@danshira.glovecare`. Ateliê no Jabaquara, São Paulo/SP, com agendamento.
