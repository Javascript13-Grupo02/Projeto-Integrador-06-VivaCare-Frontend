import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ListaApolices from "./components/apolice/listaapolice/ListaApolice";
import DeletarApolice from "./components/apolice/deletarapolice/DeletarApolice";
import FormApolice from "./components/apolice/formapolice/FormApolice";
import Home from "./pages/home/Home";
import DeletarCliente from "./components/cliente/deletarcliente/DeletarCliente";
import FormCliente from "./components/cliente/formcliente/FormCliente";
import Sobre from "./pages/sobre/Sobre";
import Equipe from "./pages/equipe/Equipe";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import ListaClientes from "./components/cliente/listacliente/ListaCliente";
import FormUsuario from "./pages/cadastro/Cadastro";
import Perfil from "./pages/perfil/Perfil";
import AtualizarPerfil from "./pages/perfil/AtualizarPerfil";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sobre" element={<Sobre/>}/>
        <Route path="/equipe" element={<Equipe/>}/>
        <Route path="/perfil" element={<Perfil/>}/>
        <Route path="/atualizarusuario" element={<AtualizarPerfil/>}/>
        <Route path="/apolices" element={<ListaApolices/>}/>
        <Route path="/clientes" element={<ListaClientes/>}/>
        <Route path="/cadastro" element={<FormUsuario/>}/>
        <Route path="/deletarapolice/:id" element={<DeletarApolice/>}/>
        <Route path="/cadastrarapolice" element={<FormApolice/>}/>
        <Route path="/editarapolice/:id" element={<FormApolice/>}/>
        <Route path="/deletarcliente/:id" element={<DeletarCliente/>}/>
        <Route path="/cadastrarcliente" element={<FormCliente/>}/>
        <Route path="/editarcliente/:id" element={<FormCliente/>}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App

