import { BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Login />
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
