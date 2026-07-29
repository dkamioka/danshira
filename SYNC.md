# Sincronizar com o Claude Code e publicar no GitHub Pages

## 1. Clonar o repo que já existe

```bash
git clone git@github.com:dkamioka/danshira.git
cd danshira
```

O repo hoje tem só um stub (`index.html` "Site em construção" + `style.css`). Descompacte
este pacote dentro dele e mantenha os nomes de arquivo do repo (`style.css`, não
`styles.css`) — o stub vai ser substituído pelo site real.

```
danshira-site/
├─ CLAUDE.md                 ← mova o CLAUDE.md deste pacote para a raiz
├─ README.md                 ← este handoff (pode virar docs/HANDOFF.md)
├─ .claude/
│  ├─ skills/designsync/SKILL.md   ← cria o comando /designsync
│  └─ commands/publish.md          ← cria o comando /publish
├─ assets/                   ← como está aqui
└─ design-reference/         ← o protótipo, como referência
```

> A pasta `.claude/` começa com ponto — confirme que ela foi copiada
> (`ls -a`), senão os comandos não aparecem.

```bash
git add -A
git commit -m "Design aprovado: home Dan Shira (referência + assets)"
git push
```

## 2. Como o design e o código conversam

O GitHub é a fonte comum: o Claude Code escreve no repo, e eu leio o repo quando você me
pedir para sincronizar — aí sigo o design a partir da versão nova do código. Eu **leio**,
não escrevo no repo; quem commita é você/o Claude Code.

## 3. Pedir o site ao Claude Code

Na pasta do repo, rode `claude` e digite:

```
/designsync tudo
```

O comando já vem pronto neste pacote (é o arquivo
`.claude/skills/designsync/SKILL.md`). Ele lê o `CLAUDE.md`, o handoff e a opção 2a do
protótipo, e monta — ou atualiza — `index.html` + `styles.css` + `app.js`. Depois pode
rodar por seção: `/designsync produtos`, `/designsync comparador`. Para publicar,
`/publish`.

Se preferir pedir na mão, o prompt equivalente é:

> Leia README.md e CLAUDE.md. Recrie a opção **2a** de
> `design-reference/Dan Shira Home.dc.html` como um site estático responsivo em
> `index.html` + `styles.css` + `app.js` na raiz, fluido de 360px a 1920px, usando os
> assets de `assets/`. Mantenha a copy em pt-BR, o comparador antes/depois com auto-play
> em CSS e o fundo de base de corte. Não use framework nem `support.js`.

O `CLAUDE.md` já entra no contexto automaticamente em toda conversa dentro do repo, então
as regras de estilo e as armadilhas do comparador vão junto sem você precisar repetir.

Dicas: peça também `git commit` a cada etapa e um `.nojekyll` vazio na raiz (evita que o
Jekyll do Pages ignore arquivos com nome fora do padrão).

## 4. Ligar o GitHub Pages

No repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
Branch: `main` / `/ (root)` → Save**.

Em ~1 minuto o site fica em `https://dkamioka.github.io/danshira/`.
Como as imagens são referenciadas em caminho relativo (`assets/...`), funciona nesse
subdiretório sem ajuste.

Domínio próprio (ex. `danshira.com.br`): em **Settings → Pages → Custom domain**, e no
DNS do domínio um `CNAME` de `www` para `dkamioka.github.io` (ou os 4 registros `A`
do apex do GitHub). O Pages cria o arquivo `CNAME` no repo — não apague.

## 5. Ciclo de trabalho depois

```bash
claude          # pede as mudanças
git add -A && git commit -m "..." && git push
```
Cada `push` na `main` republica o site. Fotos novas: coloque em `assets/` e peça ao
Claude Code para normalizar os pares antes/depois em 820×820 (o processo está no README).

## Voltar aqui
O projeto de design já está associado a `dkamioka/danshira`. Depois de você dar push, me
pede para sincronizar: eu leio o que mudou no repo e sigo desenhando a partir dali.
