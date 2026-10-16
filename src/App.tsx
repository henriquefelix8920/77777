import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/aulas-ao-vivo"
          element={
            <PlaceholderPage
              kicker="Aulas ao vivo · Online"
              title="Aulas de Guitarra e Violão ao Vivo"
              accent="#00f0ff"
              description="Encontros individuais em tempo real, pela câmera: repertório, técnica e música de verdade, no seu ritmo. Página completa em construção — garanta seu horário falando direto comigo."
            />
          }
        />
        <Route
          path="/curso-improviso-na-pentatonica"
          element={
            <PlaceholderPage
              kicker="Curso · Improviso"
              title="Improviso na Pentatônica"
              accent="#ff007f"
              description="Do mapa das escalas ao solo com frase próprio: um método para destravar a improvisação na escala pentatônica. Página completa em construção — fale comigo pelo WhatsApp para entrar na lista."
            />
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
