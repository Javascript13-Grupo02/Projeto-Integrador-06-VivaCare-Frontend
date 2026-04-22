import { Link } from "react-router-dom";
import type Apolice from "../../../models/Apolice";

interface CardApoliceProps {
  apolice: Apolice ;
}

function CardApolice({ apolice }: CardApoliceProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-gray-200 border border-sky-200 
                    hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 w-95 h-full mx-auto my-10">
      
      {/* LINHA DECORATIVA NO TOPO */}
      <div className="w-full h-1 bg-sky-800" />

      {/* CORPO DO CARD */}
      <div className="px-8 py-7 flex-1 flex flex-col gap-6">
        <div>
            <h1 className="text-sky-800 text-base font-semibold uppercase tracking-wider leading-snug">
            {apolice.cliente.nome}
            </h1>
            <p className="text-black text-sm font-medium leading-1">cliente</p>
        </div>

        <div className="flex flex-col columns-2 gap-3">

          <div className="flex text-sky-800 text-sm leading-relaxed font-normal">
            <div>
                <p>Plano:</p>
                <p>Dependentes:</p>
                <p>Data de Início:</p>
                <p>Data de Fim:</p>
                <p>Corretor:</p>
            </div>

            <div className="flex flex-col ml-5 text-black font-medium">
                <p>{apolice.plano}</p>
                <p>{apolice.dependentes}</p>
                <p>{new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: 'medium',
                    }).format(new Date(apolice.data_inicio))}</p>

                <p >{new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: 'medium',
                    }).format(new Date(apolice.data_fim))}</p>
                <p>{apolice.usuario.nome}</p>
            </div>
            <div>
              <h4 className="text-sky-800 text-base font-medium">
                Preço:
              </h4>
              <h4 className="flex flex-col ml-5">
                {new Intl.NumberFormat("pt-BR", {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(apolice.preco)} 
              </h4>
            </div>

           
          </div>

          
        </div>
      </div>

      {/* RODAPÉ COM BOTÕES */}
      <div className="grid grid-cols-2 border-t border-sky-800/20 bg-sky-800/5">
        <Link
          to={`/editarapolice/${apolice.id}`}
          className="flex items-center justify-center gap-2.5 py-4 text-sky-800 text-xs font-semibold uppercase tracking-widest border-r 
                    border-sky-800/20 hover:bg-sky-800/10 transition-colors duration-200"
        >
          <span>✎</span> EDITAR
        </Link>
        <Link
          to={`/deletarapolice/${apolice.id}`}
          className="flex items-center justify-center gap-2.5 py-4 text-sky-800 text-xs font-semibold uppercase tracking-widest hover:bg-sky-800/10 transition-colors duration-200"
        >
          <span>✕</span> DELETAR
        </Link>
      </div>
    </div>
  );
}

export default CardApolice;