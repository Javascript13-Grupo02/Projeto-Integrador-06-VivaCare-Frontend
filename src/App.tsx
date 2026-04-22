

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaCliente from "./components/cliente/listacliente/ListaCliente";
import FormCliente from "./components/cliente/formcliente/FormCliente";
import DeletarCliente from "./components/cliente/deletarcliente/DeletarCliente";
import Equipe from "./pages/equipe/Equipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<ListaCliente />} />
        <Route path="/clientes/cadastrar" element={<FormCliente />} />
        <Route path="/clientes/deletar" element={<DeletarCliente />} />
        <Route path="/equipe" element={<Equipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App