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

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado para apagar um cliente", "info");
      navigate("/login");
    }
  }, [token]);

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

  async function deletarCliente() {
    setIsLoading(true);
    try {
      await deletar(`/clientes/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Cliente apagado com sucesso!", "sucesso");
      retornar();
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
    <div className="min-h-screen bg-linear-to-br from-white to-sky-100 py-12 px-4 flex items-start justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-4">

        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            Descadastrar Cliente
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Tem certeza que deseja descadastrar este cliente?
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl overflow-hidden bg-sky-900 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

          <div className="h-0.5 bg-linear-to-r from-sky-400 to-transparent" />

          {/* Avatar e info */}
          <div className="flex items-center gap-7 px-10 py-8">
            <img
              src={
                cliente.foto && cliente.foto !== "string"
                  ? cliente.foto
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(cliente.nome || 'C')}&background=075985&color=fff&size=128`
              }
              alt="Foto do Cliente"
              className="w-20 h-20 rounded-full border-3 border-white/20 object-cover shrink-0"
            />
            <div>
              <p className="text-slate-100 font-bold text-base uppercase tracking-wide">
                {cliente.nome}
              </p>
              <p className="text-slate-400 text-sm">{cliente.email}</p>
            </div>
          </div>

          {/* Aviso */}
          <div className="mx-6 mb-5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
            <p className="text-red-300 text-xs font-semibold uppercase tracking-widest text-center">
              ⚠ Esta ação não pode ser desfeita
            </p>
          </div>

          {/* Botões */}
          <div className="grid grid-cols-2 border-t border-white/10">
            <button
              className="py-4 text-red-300 text-xs font-semibold uppercase tracking-widest border-r border-white/10 hover:bg-red-500/10 transition-colors duration-200"
              onClick={retornar}
            >
              ✕ Não, Cancelar
            </button>
            <button
              className="py-4 text-green-300 text-xs font-semibold uppercase tracking-widest hover:bg-green-500/10 transition-colors duration-200 flex items-center justify-center"
              onClick={deletarCliente}
            >
              {isLoading
                ? <ClipLoader color="#86efac" size={16} />
                : <span>✓ Sim, Deletar</span>
              }
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DeletarCliente;
