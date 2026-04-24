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
import Footer from "./components/footer/Footer";

// function FundoClaro({ children }: { children: React.ReactNode }) {
//   return (
//     <div
//       className="min-h-screen flex flex-col items-center py-16 px-4"
//       style={{
//         backgroundImage: `
//           radial-gradient(ellipse at top left, rgba(56,189,248,0.25) 0%, transparent 55%),
//           radial-gradient(ellipse at bottom right, rgba(14,165,233,0.2) 0%, transparent 55%),
//           linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)
//         `
//       }}
//     >
//       {children}
//     </div>
//   )
// }

function FundoListras({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-start justify-start py-16 px-4"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(186,230,255,0.25) 20px,
            rgba(186,230,255,0.25) 21px
          ),
          linear-gradient(to bottom right, #ffffff, #e0f2fe)
        `
      }}
    >
      {children}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/sobre" element={<FundoListras><Sobre /></FundoListras>}/>
        <Route path="/equipe" element={<FundoListras><Equipe /></FundoListras>}/>
        <Route path="/perfil" element={<FundoListras><Perfil /></FundoListras>}/>
        <Route path="/atualizarusuario" element={<FundoListras><AtualizarPerfil/></FundoListras>}/>
        <Route path="/apolices" element={<FundoListras><ListaApolices /></FundoListras>}/>
        <Route path="/clientes" element={<FundoListras><ListaClientes /></FundoListras>}/>
        <Route path="/cadastro" element={<FundoListras><FormUsuario/></FundoListras>}/>
        <Route path="/deletarapolice/:id" element={<FundoListras><DeletarApolice/></FundoListras>}/>
        <Route path="/cadastrarapolice" element={<FormApolice/>}/>
        <Route path="/editarapolice/:id" element={<FundoListras><FormApolice /></FundoListras>}/>
        <Route path="/deletarcliente/:id" element={<FundoListras><DeletarCliente/></FundoListras>}/>
        <Route path="/cadastrarcliente" element={<FormCliente/>}/>
        <Route path="/editarcliente/:id" element={<FundoListras><FormCliente /></FundoListras>}/>
      </Routes>
      <Footer/>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App

