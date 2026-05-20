import { useContext, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import {
  ListIcon,
  XIcon,
  FileTextIcon,
  UsersIcon,
  InfoIcon,
  UsersThreeIcon,
  UserIcon,
  SignOutIcon,
  SignInIcon,
} from "@phosphor-icons/react";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  // Estado do Menu Mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!", "sucesso");
    navigate("/");
    setIsMenuOpen(false); // fecha o menu ao deslogar
  }

  let component: ReactNode;
  let componentLogin: ReactNode;

  component = (
    <div className="w-full flex justify-center py-4 bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 text-white">
      <div className="container flex justify-between text-base sm:text-lg mx-8">
        <Link to="/home" className="text-xl sm:text-2xl font-bold">
          <div className="flex gap-0.5 sm:gap-2">
            <img
              src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Logo%20VivaCare%20Clara.png?updatedAt=1777032061555"
              alt=""
              className="h-9 w-auto"
            />
            VivaCare
          </div>
        </Link>

        <div className="hidden md:flex  gap-1 sm:gap-4">
          <Link to="/sobre" className="hover:text-[#45a8f0] transition-colors">
            Sobre
          </Link>
          <Link to="/equipe" className="hover:text-[#45a8f0] transition-colors">
            Equipe
          </Link>
          <Link to="/login" className="hover:text-[#45a8f0] transition-colors">
            Entrar
          </Link>
        </div>
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1 focus:outline-none cursor-pointer"
          >
            <ListIcon size={28} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );

  componentLogin = (
    <div className="w-full flex justify-center py-4 bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 text-white">
      <div className="container flex justify-between text-base sm:text-lg mx-8">
        <Link to="/home" className="text-xl sm:text-2xl font-bold">
          <div className="flex gap-0.5 sm:gap-2">
            <img
              src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Logo%20VivaCare%20Clara.png?updatedAt=1777032061555"
              alt=""
              className="h-9 w-auto"
            />
            VivaCare
          </div>
        </Link>

        <div className="hidden md:flex gap-1 sm:gap-4">
          <Link
            to="/apolices"
            className="hover:text-[#45a8f0] transition-colors hidden sm:flex gap-4"
          >
            Apólices
          </Link>
          {["admin", "corretor"].includes(usuario.roles) && (
            <Link
              to="/clientes"
              className="hover:text-[#45a8f0] transition-colors hidden sm:flex gap-4"
            >
              Clientes
            </Link>
          )}
          <Link to="/sobre" className="hover:text-[#45a8f0] transition-colors">
            Sobre
          </Link>
          <Link to="/equipe" className="hover:text-[#45a8f0] transition-colors">
            Equipe
          </Link>
          <Link to="/perfil" className="hover:text-[#45a8f0] transition-colors">
            Perfil
          </Link>
          <Link
            to=""
            onClick={logout}
            className="hover:text-[#45a8f0] transition-colors"
          >
            Sair
          </Link>
        </div>

        {/* Botão MenuMobile */}
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1 focus:outline-none cursor-pointer"
          >
            <ListIcon size={28} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );

  // Menu Mobile
  const menuMobile = (
    <>
      {/* Fundo escuro */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-sky-950 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Cabeçalho do menu */}
        <div className="flex justify-between items-center p-6 border-b border-sky-800">
          <span className="text-xl font-bold">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1 rounded-md hover:bg-sky-800 transition-colors cursor-pointer"
          >
            <XIcon size={24} weight="bold" />
          </button>
        </div>

        {/* Conteúdo quando está logado ou não */}
        <div className="flex flex-col p-4 gap-2 grow overflow-y-auto">
          {usuario.token !== "" ? (
            <>
              <Link
                to="/apolices"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-800 transition-colors"
              >
                <FileTextIcon size={22} /> Apólices
              </Link>
              {["admin", "corretor"].includes(usuario.roles) && (
                <Link
                  to="/clientes"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-800 transition-colors"
                >
                  <UsersIcon size={22} /> Clientes
                </Link>
              )}
              <Link
                to="/sobre"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-800 transition-colors"
              >
                <InfoIcon size={22} /> Sobre
              </Link>
              <Link
                to="/equipe"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-800 transition-colors"
              >
                <UsersThreeIcon size={22} /> Equipe
              </Link>
              <Link
                to="/perfil"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-800 transition-colors"
              >
                <UserIcon size={22} /> Perfil
              </Link>
              <div className="mt-4 border-t border-sky-800 pt-4">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <SignOutIcon size={22} /> Sair
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/sobre"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-800 transition-colors"
              >
                <InfoIcon size={22} /> Sobre
              </Link>
              <Link
                to="/equipe"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-800 transition-colors"
              >
                <UsersThreeIcon size={22} /> Equipe
              </Link>
              <div className="mt-4 border-t border-sky-800 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-sky-800 hover:bg-sky-700 transition-colors"
                >
                  <SignInIcon size={22} /> Entrar
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {usuario.token !== "" ? componentLogin : component}
      {menuMobile}
    </>
  );
}

export default Navbar;
