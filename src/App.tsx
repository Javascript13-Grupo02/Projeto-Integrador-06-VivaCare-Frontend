import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ListaApolices from "./components/apolice/listaapolice/ListaApolice";
import DeletarApolice from "./components/apolice/deletarapolice/DeletarApolice";
import FormApolice from "./components/apolice/formapolice/FormApolice";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/apolices" element={<ListaApolices/>}/>
        <Route path="/deletarapolice/:id" element={<DeletarApolice/>}/>
        <Route path="/cadastrarapolice" element={<FormApolice/>}/>
        <Route path="/editarapolice/:id" element={<FormApolice/>}/>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App

