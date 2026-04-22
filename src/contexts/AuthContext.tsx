// import { createContext, useRef, useState, type ReactNode } from "react";
// import type UsuarioLogin from "../models/UsuarioLogin";
// import { login } from "../services/Service";
// import { ToastAlerta } from "../utils/ToastAlerta";

// interface AuthContextProps {
//   usuario: UsuarioLogin;
//   handleLogout(): void;
//   handleLogin(usuario: UsuarioLogin): Promise<void>;
//   isLoading: boolean;
//   isLogout: boolean;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthContext = createContext({} as AuthContextProps);

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [usuario, setUsuario] = useState<UsuarioLogin>({
//     id: 0,
//     nome: "",
//     usuario: "",
//     senha: "",
//     foto: "",
//     token: "",
//   });

//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const isLogout = useRef(false);

//   async function handleLogin(usuarioLogin: UsuarioLogin) {
//     setIsLoading(true);

//     try {
//       await login("/usuarios/logar", usuarioLogin, setUsuario);
//       ToastAlerta("Usuário autenticado com sucesso!", "sucesso");

//       isLogout.current = false;
//     } catch (error) {
//       ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
//     }

//     setIsLoading(false);
//   }

//   function handleLogout() {
//     isLogout.current = true;

//     setUsuario({
//       id: 0,
//       nome: "",
//       usuario: "",
//       senha: "",
//       foto: "",
//       token: "",
//     });
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         usuario,
//         handleLogin,
//         handleLogout,
//         isLoading,
//         isLogout: isLogout.current,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
