import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import CategoryMovie from "./Pages/CategoryMovie";
import AnimeDetail from "./Pages/AnimeDetail";
import SearchPage from "./Pages/SearchPage";
import CoverPage from "./Pages/CoverPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<CoverPage />} />
            <Route path="genre/:category" element={<CategoryMovie />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:name" element={<AnimeDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
