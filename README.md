# Valkyrja Reis — Música, Tecnologia e Ideias

Site autoral de Valkyrja Reis. A experiência conecta aulas online de guitarra e violão, improvisação e criação de sites para artistas, profissionais e projetos.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4
- React Router
- Deploy conectado ao Vercel (`vercel.json`)

## Rodar localmente

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

## Fundo em flashes

A home usa os seis vídeos (`video1.mp4` a `video6.mp4`) em flashes aleatórios de tela cheia, cada um por 3 segundos. Cada flash escolhe um trecho e enquadramento ao acaso; somente um decoder fica ativo por vez. As cópias leves são servidas de `public/club-videos/`, em 960×540, 20 fps e sem áudio; os originais permanecem em `public/`.

Hero, chamadas, cartões e manifesto têm parallax ligado à rolagem da página; os reveals aparecem conforme entram na viewport. As animações respeitam `prefers-reduced-motion`, pausam os vídeos quando a aba fica oculta e não iniciam o fundo em conexões que pedem economia de dados.

## Rotas

- `/` — apresentação e três caminhos: aulas, curso/comunidade e sites
- `/aulas-ao-vivo` — informações sobre aulas individuais
- `/curso-improviso-na-pentatonica` — página da comunidade de improvisação

## Configuração

O número de WhatsApp e a identidade básica estão centralizados em `src/config.ts`. A home mantém os links de TikTok e YouTube fora da navegação, conforme solicitado.
