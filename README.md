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

A home usa os seis vídeos (`video1.mp4` a `video6.mp4`) em recortes aleatórios, com um decoder ativo por vez. As cópias para o fundo são servidas de `public/club-videos/`, em 960×540, 20 fps e sem áudio; os originais permanecem em `public/`. O efeito respeita `prefers-reduced-motion`, pausa quando a aba fica oculta e não inicia em conexões que pedem economia de dados.

## Rotas

- `/` — apresentação e três caminhos: aulas, curso/comunidade e sites
- `/aulas-ao-vivo` — informações sobre aulas individuais
- `/curso-improviso-na-pentatonica` — página da comunidade de improvisação

## Configuração

O número de WhatsApp e a identidade básica estão centralizados em `src/config.ts`. A home mantém os links de TikTok e YouTube fora da navegação, conforme solicitado.
