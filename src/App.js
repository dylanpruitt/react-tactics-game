import { BrowserRouter, Routes, Route } from "react-router-dom";

import Game from './pages/Game';
import Home from './pages/Home';
import LevelSelect from './pages/LevelSelect';
import NoPage from './pages/NoPage';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/LevelSelect" element={<LevelSelect />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}