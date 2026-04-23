import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { ClipLoader } from "react-spinners";
import type Cliente from "../../../models/Cliente";

function DeletarCliente() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token;

  const [cliente, setCliente] = useState<Cliente>({} as Cliente);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Segurança: Se não estiver logado, manda para o login
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado para apagar um cliente", "info");
      navigate("/login");
    }
  }, [token]);

  // 2. Busca os dados do cliente assim que a tela abre para mostrar no card
  useEffect(() => {
    if (id !== undefined) {
      buscarClientePorId(id);
    }
  }, [id]);

  async function buscarClientePorId(id: string) {
    try {
      await buscar(`/clientes/${id}`, setCliente, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
      ToastAlerta("Cliente não encontrado!", "erro");
      retornar();
    }
  }

  // 3. Função que executa o DELETE no NestJS ao clicar no botão "Sim"
  async function deletarCliente() {
    setIsLoading(true);

    try {
      await deletar(`/clientes/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Cliente apagado com sucesso!", "sucesso");
      retornar(); // Volta pra lista de clientes
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao apagar o cliente.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/clientes");
  }

  return (
    <div className="container w-1/3 mx-auto mt-10">
      <h1 className="text-4xl text-center font-bold text-sky-800 my-4">
        Deletar Cliente
      </h1>
      <p className="text-center font-semibold mb-6 text-slate-600">
        Você tem certeza de que deseja apagar o cliente a seguir?
      </p>

      {/* Card de Resumo do Cliente a ser deletado */}
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between bg-white shadow-lg">
        <header className="py-4 px-6 bg-sky-800 text-white font-bold text-2xl">
          Cliente
        </header>

        <div className="p-6 flex items-center gap-4">
          <img
            src={
              cliente.foto && cliente.foto !== "string"
                ? cliente.foto
                : "https://ik.imagekit.io/y22k2h6x5/default-avatar.png"
            }
            alt="Foto do Cliente"
            className="w-16 h-16 rounded-full border-2 border-sky-800 object-cover"
          />
          <div>
            <p className="text-xl h-full font-bold text-sky-900 uppercase">
              {cliente.nome}
            </p>
            <p className="text-slate-600">{cliente.email}</p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex bg-slate-100">
          <button
            className="text-slate-100 bg-red-500 hover:bg-red-700 w-full py-4 font-bold transition-colors"
            onClick={retornar}
          >
            Não, Cancelar
          </button>

          <button
            className="text-slate-100 bg-sky-800 hover:bg-sky-900 w-full py-4 font-bold flex items-center justify-center transition-colors"
            onClick={deletarCliente}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim, Deletar</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCliente;
