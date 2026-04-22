import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
  isLogout: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
    const salvo = localStorage.getItem('usuario');
    return salvo ? JSON.parse(salvo) : {
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    };
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login("/usuarios/logar", usuarioLogin, (dados: UsuarioLogin) => {
        setUsuario(dados);
        localStorage.setItem('usuario', JSON.stringify(dados));
      });
      ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
      setIsLogout(false);
    } catch (error) {
      ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setIsLogout(true);
    localStorage.removeItem('usuario');
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        handleLogin,
        handleLogout,
        isLoading,
        isLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}