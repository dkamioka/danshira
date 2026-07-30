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
- Fotos: pares `assets/ba/<slug>-antes.webp` / `-depois.webp`, 820×820. Novos pares devem
  ser normalizados no mesmo formato (fundo = a própria foto desfocada e escurecida).
- Os dados dos casos (peça, serviço, etapa, resumo, nota, ângulos) ficam **no HTML**, em
  `<article class="case">`, um por caso, com os inativos em `hidden`. O `app.js` lê do DOM
  e não guarda conteúdo. Crawlers de IA não executam JS — conteúdo em JS fica invisível.

## Imagens
Formato de entrega é **WebP** (q82 para fotos, q88 quando há transparência real). Não
voltar a PNG: as fotos originais eram PNG e pesavam 19 MB no primeiro carregamento;
em WebP são ~370 KB. Exceções que seguem em outro formato: `assets/og-cover.jpg` (card
social — WhatsApp e Instagram não são confiáveis com WebP), `favicon.ico`,
`apple-touch-icon.png` e `assets/icon-512.png`.

Todo `<img>` precisa de `alt`, `width`, `height` e `loading="lazy"` (exceto o logo do
header, acima da dobra). O `width`/`height` no HTML exige `height: auto` no CSS — sem
isso o atributo vira presentational hint e vence o `aspect-ratio`, esticando a imagem.

## SEO e agentes de IA
`robots.txt` libera explicitamente GPTBot, ClaudeBot, PerplexityBot e afins — sem acesso
não há citação. Há JSON-LD `LocalBusiness` + `WebSite` no `<head>`, `sitemap.xml` e
`llms.txt`. Ao mudar serviços, produtos ou contato, atualizar o JSON-LD e o `llms.txt`
junto — eles duplicam o conteúdo da página de propósito.

## O que está pendente
Fotos reais dos itens de revenda, mais peças de marcenaria, depoimentos, preços, retrato
do Danilo e o logo em vetor (SVG). Placeholders de revenda levam a tarja
`IMAGEM PROVISÓRIA` — não remover a tarja antes de trocar a foto.

Não existe seção "Cuidados", mas o item está no menu (`<span>` sem destino, como no mock).
É a maior oportunidade de busca orgânica do site e precisa de texto escrito pelo Danilo.

Em `assets/ba/raw-5-antes.webp` há um ícone roxo do Instagram embutido nos pixels, ao lado
do selo redondo da marca. O selo é intencional; o ícone não.

## Contato/CTA
WhatsApp `+55 11 91753-8155` → `https://wa.me/5511917538155`. Instagram
`@danshira.glovecare`. Ateliê no Jabaquara, São Paulo/SP, com agendamento.
