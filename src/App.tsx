import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
