# Valkyrja Reis — Música, Tecnologia e Ideias

Site autoral de Valkyrja Reis. A experiência conecta aulas online de guitarra e violão, improvisação e criação de sites para artistas, profissionais e projetos.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4
- React Router com carregamento sob demanda das landing pages
- Deploy conectado ao Vercel (`vercel.json`)

## Rodar localmente

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

## Fundo em flashes

A home e as páginas de aulas/improvisação compartilham o fundo cyberpunk em flashes de tela cheia. Cada cena usa um trecho aleatório de um dos seis clipes, com aproximadamente 3 segundos por flash e dois players alternados para trocar sem intervalo preto. O navegador só começa a preparar os vídeos depois do primeiro render; movimento reduzido e conexões com economia de dados mantêm o fundo estático.

As versões leves ficam em `public/club-videos/` (960×540, 20 fps, sem áudio) e são as únicas entregues pelo site. Os originais de 1080p foram preservados em `source-media/videos/`, fora do diretório público, para não serem copiados ao build. O retrato otimizado é servido como `public/foto2.webp`; os arquivos originais estão em `source-media/photos/`.

Os títulos da hero e de todas as seções usam texto real e uma revelação vertical ligada ao scroll, com subida, leve perspectiva e brilho progressivo. O efeito responde à rolagem por toque e mouse; em movimento reduzido os títulos ficam imediatamente visíveis e estáticos.

## Desempenho e movimento

As três rotas usam o mesmo cabeçalho, fundo, progresso de rolagem, footer e botão de contato. As páginas secundárias são carregadas sob demanda. Títulos, chamadas e o percurso visual acompanham a rolagem; reveals usam `IntersectionObserver`. O grão animado em tela cheia foi removido para reduzir trabalho de pintura, sem retirar a atmosfera neon.

## Rotas

- `/` — apresentação e três caminhos: aulas, improvisação/comunidade e criação de sites
- `/aulas-ao-vivo` — aulas individuais de guitarra e violão online
- `/curso-improviso-na-pentatonica` — página da comunidade gratuita de improvisação

## Configuração

O número do WhatsApp e a identidade básica estão centralizados em `src/config.ts`. TikTok e YouTube não aparecem na navegação principal.
