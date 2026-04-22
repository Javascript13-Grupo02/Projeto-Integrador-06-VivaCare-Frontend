import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ListaApolices from "./components/apolice/listaapolice/ListaApolice";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/listarapolices" element={<ListaApolices/>}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App

