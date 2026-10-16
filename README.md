# Valkyrja Reis — Site oficial (hub de links cinematográfico)

Experiência digital premium para a guitarrista **Valkyrja Reis**.
Página inicial estilo linktree sobre vídeo de guitarra em loop, com CTA de conversão
para agendamento de aulas online via WhatsApp.

## Stack
- Vite + React 18 + TypeScript
- Tailwind CSS v4
- React Router (rotas preparadas para as próximas páginas)
- Deploy: Vercel (`vercel.json` incluído)

## Rodar localmente
```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (gera /dist)
```

## Vídeo de fundo
Coloque o arquivo **`video01.mp4`** dentro da pasta `public/`.
Sem o arquivo, o site exibe automaticamente um fallback neon cinematográfico.

## Configuração central
Todos os links, número de WhatsApp e textos editáveis ficam em **`src/config.ts`**:
- WhatsApp: (34) 99650-8397 → botão flutuante + CTAs com mensagem pré-preenchida
- TikTok: `@valkyrjareis1` (confirme o @ completo)
- YouTube: marcado como "em breve" — troque `href` quando o canal existir

## Rotas
- `/` — hub de links (página inicial)
- `/aulas-ao-vivo` — página placeholder (conteúdo completo será criado a seguir)
- `/curso-improviso-na-pentatonica` — página placeholder (idem)

## Paleta
`#080A14` · `#00F0FF` · `#FF007F` · `#7000FF` · `#FFEE00`
