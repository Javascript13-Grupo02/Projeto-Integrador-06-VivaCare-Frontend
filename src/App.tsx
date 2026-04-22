import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sobre from "./pages/sobre/Sobre";
import Equipe from "./pages/equipe/Equipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sobre />} />
        <Route path="/Equipe" element={<Equipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
