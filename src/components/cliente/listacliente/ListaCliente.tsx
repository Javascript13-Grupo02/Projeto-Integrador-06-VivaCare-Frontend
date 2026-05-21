import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { ClipLoader, SyncLoader } from "react-spinners";
import type Cliente from "../../../models/Cliente";
import CardCliente from "../cardcliente/CardCliente";
import ModalCliente from "../modalcliente/ModalCliente";

function ListaClientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mudança: Estado exclusivo para controlar o carregamento do botão de pesquisa
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { usuario, handleLogout, isLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Segurança: se não tiver token, volta para o login
  useEffect(() => {
    if (token === "") {
      if (!isLogout) {
        ToastAlerta("Você precisa estar logado!", "info");
      }
      navigate("/login");
    }
  }, [token, isLogout, navigate]);

  // Busca os clientes assim que a tela carrega
  useEffect(() => {
    buscarClientes();
  }, []);

  
  async function buscarClientesBarra(nome: string) {
    if (nome.length < 3) {
      setClientes([]);
      return;
    }
    try {
      
      setIsSearching(true); 
      await buscar(`/clientes/nome/${nome}`, setClientes, { headers: { Authorization: token } });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao buscar clientes", "erro");
      }
    } finally {
   
      setIsSearching(false); 
    }  
  }

  async function buscarClientes() {
    if (token === "") return;

    try {
      setIsLoading(true);
      await buscar("/clientes", setClientes, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao carregar clientes.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>

    {/* Barra de busca por cliente */}
    
    { usuario.roles === "admin" || usuario.roles === "corretor" ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const nomeBuscado = formData.get("busca-cliente") as string;
          if (!nomeBuscado || nomeBuscado.trim() === "") {
            buscarClientes();
          }
          buscarClientesBarra(nomeBuscado);
        }}
        className="flex flex-row w-full justify-center gap-0"
      >
        {/* Input */}
        <div className="p-0.75 flex-1 max-w-xl rounded-l-[14px]"
          style={{ background: 'linear-gradient(to right, #0c4a6e, #075985, #0369a1)' }}
        >
          <div className="bg-white rounded-l-[11px] h-full flex items-center gap-3 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="search"
              name="busca-cliente"
              placeholder={window.innerWidth < 640 ? "Buscar cliente..." : "Digite o nome do cliente que deseja buscar"}
              className="w-full bg-transparent outline-none text-slate-800 text-sm py-3 sm:py-3.5 placeholder:text-slate-400 sm:placeholder:text-sm"
              style={{}}
              onChange={(e) => {
                if (e.target.value === "") {
                  buscarClientes();
                }
              }}
            />
          </div>
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={isSearching}
          className="rounded-r-[14px] px-5 sm:px-6 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(to right, #0c4a6e, #075985, #0369a1)' }}
        >
          {isSearching ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-5.5 sm:h-5.5" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          )}
        </button>
      </form>
    ) : null}
        

      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#075985" size={25} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && clientes.length === 0 && (
            <span className="text-2xl text-center my-8 text-sky-900">
              Nenhum cliente encontrado no sistema VivaCare.
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {clientes.map((cliente) => (
              <CardCliente key={cliente.id} cliente={cliente} />
            ))}
            <ModalCliente />
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaClientes;
