import { useContext, useEffect, useState } from "react";
import { buscar, deletar } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Apolice from "../../../models/Apolice";

function DeletarApolice() {
  const navigate = useNavigate();
  const [apolice, setApolice] = useState<Apolice>({} as Apolice);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (token !== '' && id !== undefined) {
      buscarPorId(id)
    }
  }, [id, token])

  async function buscarPorId(id: string) {
    try {
      await buscar(`/apolices/${id}`, setApolice, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  async function deletarApolice() {
    setIsLoading(true)
    try {
      await deletar(`/apolices/${id}`, {
        headers: { Authorization: token }
      });
      ToastAlerta('Apólice apagada com sucesso.', 'sucesso')
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar a Apólice.', 'erro')
      }
    } finally {
      setIsLoading(false)
      navigate('/apolices')
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-sky-100 py-12 px-4 flex items-start justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-4">

        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            Deletar Apólice
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Tem certeza que deseja deletar esta apólice?
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl overflow-hidden bg-sky-900 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

          <div className="h-0.5 bg-linear-to-r from-sky-400 to-transparent" />

          {/* Informações da apólice */}
          <div className="px-10 py-8 flex flex-col gap-3">
            <p className="text-slate-100 font-bold text-base uppercase tracking-wide">
              {apolice?.cliente?.nome ?? 'Carregando...'}
            </p>
            <p className="text-slate-300 text-sm font-medium">
              Plano: {apolice?.plano}
            </p>
            {apolice?.data_inicio && apolice?.data_fim && (
              <p className="text-slate-400 text-xs">
                {new Intl.DateTimeFormat("pt-BR", { dateStyle: 'short' }).format(new Date(apolice.data_inicio + "T00:00:00"))}
                {' → '}
                {new Intl.DateTimeFormat("pt-BR", { dateStyle: 'short' }).format(new Date(apolice.data_fim + "T00:00:00"))}
              </p>
            )}
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
              onClick={() => navigate('/apolices')}
            >
              ✕ Não, Cancelar
            </button>
            <button
              className="py-4 text-green-300 text-xs font-semibold uppercase tracking-widest hover:bg-green-500/10 transition-colors duration-200 flex items-center justify-center"
              onClick={deletarApolice}
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

export default DeletarApolice;
