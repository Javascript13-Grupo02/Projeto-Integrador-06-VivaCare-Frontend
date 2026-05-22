import { Link } from "react-router-dom";
import type Apolice from "../../../models/Apolice";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardApoliceProps {
  apolice: Apolice;
}

function CardApolice({ apolice }: CardApoliceProps) {
  const { usuario } = useContext(AuthContext);

  // Regras de permissão separadas
  const podeEditar = ['admin', 'corretor'].includes(usuario.roles);
  const podeDeletar = ['admin'].includes(usuario.roles);

  // Só renderiza a barra inferior de ações se o usuário puder fazer pelo menos uma delas
  const mostraBarraAcoes = podeEditar || podeDeletar;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      
      <div className="h-0.5 bg-linear-to-r from-sky-400 to-transparent" />

      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8">
        <h1 className="text-slate-100 text-base font-bold uppercase tracking-wide leading-tight">
          {apolice.cliente?.nome}
        </h1>
        <p className="text-white/45 text-xs font-medium uppercase tracking-widest mt-1">
          Cliente
        </p>
      </div>

      {/* Dados */}
      <div className="px-6 py-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm leading-relaxed flex-1">
        <span className="text-sky-300 font-medium">Plano:</span>
        <span className="text-white/80 font-medium">{apolice.plano}</span>

        <span className="text-sky-300 font-medium">Dependentes:</span>
        <span className="text-white/80 font-medium">{apolice.dependentes}</span>

        <span className="text-sky-300 font-medium">Início:</span>
        <span className="text-white/80 font-medium">
          {new Intl.DateTimeFormat("pt-BR", { dateStyle: 'short' }).format(
            new Date(apolice.data_inicio + "T00:00:00")
          )}
        </span>

        <span className="text-sky-300 font-medium">Fim:</span>
        <span className="text-white/80 font-medium">
          {new Intl.DateTimeFormat("pt-BR", { dateStyle: 'short' }).format(
            new Date(apolice.data_fim + "T00:00:00")
          )}
        </span>

        <span className="text-sky-300 font-medium">Corretor:</span>
        <span className="text-white/80 font-medium">{apolice.usuario?.nome}</span>

        <span className="text-sky-300 font-bold mt-2">Preço:</span>
        <span className="text-slate-100 font-bold mt-2">
          {new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(apolice.preco)}
        </span>
      </div>

      {/* Botões condicionados */}
      {mostraBarraAcoes && (
        <div className={`grid border-t border-white/8 ${podeEditar && podeDeletar ? "grid-cols-2" : "grid-cols-1"}`}>
          
          {/* Botão Editar: Aparece para Admin e Corretor */}
          {podeEditar && (
            <Link
              to={`/editarapolice/${apolice.id}`}
              className={`flex items-center justify-center gap-2 py-4 text-sky-300 text-xs font-semibold uppercase tracking-widest hover:bg-sky-300/10 transition-colors duration-200 ${
                podeDeletar ? "border-r border-white/8" : ""
              }`}
            >
              <span>✎</span> Editar
            </Link>
          )}

          {/* Botão Deletar: Só aparece para Admin */}
          {podeDeletar && (
            <Link
              to={`/deletarapolice/${apolice.id}`}
              className="flex items-center justify-center gap-2 py-4 text-white/35 text-xs font-semibold uppercase tracking-widest hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
            >
              <span>✕</span> Deletar
            </Link>
          )}

        </div>
      )}
    </div>
  );
}

export default CardApolice;