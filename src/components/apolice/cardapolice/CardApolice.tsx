import { Link } from "react-router-dom";
import type Apolice from "../../../models/Apolice";

interface CardApoliceProps {
  apolice: Apolice ;
}

function CardApolice({ apolice }: CardApoliceProps) {
  return (
    <div className="grid grid-cols-1 rounded-2xl overflow-hidden bg-gray-200 border border-sky-200 
                hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 w-96 h-full mx-auto my-10">
      
      {/* LINHA DECORATIVA NO TOPO */}
      <div className="w-full h-1 bg-sky-800" />

      {/* CORPO DO CARD */}
      <div className="px-8 py-7 grid gap-6">
        <div>
            <h1 className="text-sky-800 text-base font-semibold uppercase tracking-wider leading-tight">
            {apolice.cliente.nome}
            </h1>
            <p className="text-black text-sm font-medium leading-none">cliente</p>
        </div>

        {/* Grid para os campos de dados */}
        <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm leading-relaxed">
            <span className="text-sky-800">Plano:</span>
            <span className="text-black font-medium">{apolice.plano}</span>
            
            <span className="text-sky-800">Dependentes:</span>
            <span className="text-black font-medium">{apolice.dependentes}</span>
            
            <span className="text-sky-800">Data de Início:</span>
            <span className="text-black font-medium">{new Intl.DateTimeFormat("pt-BR", { dateStyle: 'short' }).format(new Date(apolice.data_inicio + "T00:00:00"))}</span>
            
            <span className="text-sky-800">Data de Fim:</span>
            <span className="text-black font-medium">{new Intl.DateTimeFormat("pt-BR", { dateStyle: 'short' }).format(new Date(apolice.data_fim))}</span>
            
            <span className="text-sky-800">Corretor:</span>
            <span className="text-black font-medium">{apolice.usuario?.nome}</span>
            
            <span className="text-sky-800 font-semibold mt-2">Preço:</span>
            <span className="text-black font-semibold mt-2">{new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(apolice.preco)}</span>
        </div>
      </div>

      {/* RODAPÉ COM BOTÕES */}
      <div className="grid grid-cols-2 border-t border-sky-800/20 bg-sky-800/5">
        <Link
          to={`/editarapolice/${apolice.id}`}
          className="grid grid-flow-col justify-center items-center gap-2.5 py-4 text-sky-800 text-xs font-semibold uppercase tracking-widest border-r 
                    border-sky-800/20 hover:bg-sky-800/10 transition-colors duration-200"
        >
          <span>✎</span> EDITAR
        </Link>
        <Link
          to={`/deletarapolice/${apolice.id}`}
          className="grid grid-flow-col justify-center items-center gap-2.5 py-4 text-sky-800 text-xs font-semibold uppercase tracking-widest hover:bg-sky-800/10 transition-colors duration-200"
        >
          <span>✕</span> DELETAR
        </Link>
      </div>
    </div>
  )

}


export default CardApolice;