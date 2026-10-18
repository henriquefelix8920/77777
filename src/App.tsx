import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import { GuitarLessonsPage, ImprovisationCommunityPage } from "./pages/LandingPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aulas-ao-vivo" element={<GuitarLessonsPage />} />
        <Route path="/curso-improviso-na-pentatonica" element={<ImprovisationCommunityPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
