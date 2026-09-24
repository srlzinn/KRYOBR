# Achadinhos BR

Site de vitrine de produtos em promoção com links de afiliado. HTML, CSS e JavaScript puro — sem backend, sem banco de dados, sem login. Abra `index.html` para funcionar.

## Estrutura

```
achadinhos-br/
├── index.html      → estrutura da página
├── style.css        → todo o visual do site
├── products.js       → onde ficam os produtos
├── script.js          → lógica (busca, filtros, modal etc.)
├── assets/
│   ├── logo/
│   └── images/
└── README.md
```

## 1. Onde adiciono produtos

Abra `products.js`. Cada produto é um objeto dentro da lista `products`. Para adicionar um novo:

1. Copie um bloco inteiro (de `{` até `},`).
2. Cole antes do `];` final.
3. Troque os valores (`id` precisa ser único).
4. Salve — o card aparece automaticamente no site.

Categorias válidas (campo `category`): `casa`, `ferramentas`, `tecnologia`, `eletronicos`, `cozinha`, `casa-inteligente`, `games`, `beleza`, `automotivo`, `moda`. Se quiser criar uma categoria nova, adicione também um objeto em `CATEGORIES` no topo do mesmo arquivo.

## 2. Onde coloco os links de afiliado

No mesmo objeto do produto, campo `affiliateLink`. Cole a URL completa do link de afiliado, por exemplo:

```js
affiliateLink: "https://www.exemplo.com/produto?tag=seu-id-afiliado"
```

O botão "VER OFERTA" abre esse link em nova aba, com `rel="nofollow sponsored noopener"` (padrão recomendado para links de afiliado).

## 3. Onde troco logo/nome

- **Nome do site**: procure por `Achadinhos<span>BR</span>` em `index.html` (aparece no header, no menu mobile e no footer) e troque o texto.
- **Título da aba/SEO**: tags `<title>` e `<meta name="description">` no `<head>` de `index.html`.
- **Cores da marca**: no topo de `style.css`, dentro de `:root`, as variáveis `--amarelo`, `--grafite-950`, `--verde` etc.
- **Favicon**: atualmente é um emoji (🛍️) embutido no HTML; para trocar por uma logo própria, salve o arquivo em `assets/logo/` e troque a tag `<link rel="icon">`.
- **Imagem de compartilhamento (Open Graph)**: coloque uma imagem em `assets/logo/og-image.png` e ajuste o caminho na tag `<meta property="og:image">`.

## 4. Como publicar na Vercel

1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. Suba esta pasta para um repositório no GitHub (ou use o upload direto da Vercel, sem GitHub).
3. Na Vercel, clique em **Add New → Project**.
4. Selecione o repositório (ou arraste a pasta, se estiver usando upload direto).
5. Como é um site estático, não é preciso configurar build command nem framework — deixe em branco/"Other".
6. Clique em **Deploy**. Em menos de um minuto o site estará no ar com uma URL gratuita (`seu-projeto.vercel.app`).

Qualquer alteração futura nos arquivos (novo produto, novo link, nova cor) é só salvar, subir de novo para o GitHub (ou reenviar a pasta) — a Vercel atualiza o site automaticamente.

## Observações

- As imagens dos produtos de demonstração usam `placehold.co` como placeholder. Troque o campo `image` de cada produto pela URL da imagem real quando tiver os links de afiliado definitivos.
- Todos os produtos de exemplo usam `affiliateLink: "#"` — troque por links reais antes de divulgar o site.
