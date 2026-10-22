import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";

const GuitarLessonsPage = lazy(() =>
  import("./pages/LandingPages").then((pages) => ({
    default: pages.GuitarLessonsPage,
  })),
);
const ImprovisationCommunityPage = lazy(() =>
  import("./pages/LandingPages").then((pages) => ({
    default: pages.ImprovisationCommunityPage,
  })),
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<div className="min-h-dvh bg-[#05070b]" aria-busy="true" />}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aulas-ao-vivo" element={<GuitarLessonsPage />} />
          <Route
            path="/curso-improviso-na-pentatonica"
            element={<ImprovisationCommunityPage />}
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
