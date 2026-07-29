---
description: Publica o site no GitHub Pages (verifica, commita e faz push na main).
allowed-tools: Read, Bash, Edit
---

# /publish — publicar no GitHub Pages

1. Confira que existe `index.html` na raiz e um `.nojekyll` vazio ao lado dele.
2. Confira que nenhum caminho de asset começa com `/` (o site roda em subdiretório
   `usuario.github.io/<repo>/`, então tudo precisa ser relativo: `assets/...`).
3. `!git status --short` — mostre o que vai entrar.
4. Commit com mensagem descritiva e `git push origin main`.
5. Lembre o endereço final: `https://<usuario>.github.io/<repo>/` (~1 min para atualizar).
   Se o Pages ainda não estiver ligado, instrua: Settings → Pages → Deploy from a branch →
   `main` / `/ (root)`.
