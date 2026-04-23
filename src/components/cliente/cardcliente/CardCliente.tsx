import { Link } from "react-router-dom";
import type Cliente from "../../../models/Cliente";

interface CardClienteProps {
  cliente: Cliente;
}

function CardCliente({ cliente }: CardClienteProps) {
  return (
    <div
      className="grid grid-cols-1 rounded-2xl overflow-hidden bg-gray-200 border border-sky-200 
                hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 w-96 h-full mx-auto my-10"
    >
      {/* LINHA DECORATIVA NO TOPO */}
      <div className="w-full h-1 bg-sky-800" />

      {/* CORPO DO CARD */}
      <div className="px-8 py-7 grid gap-6">
        {/* CABEÇALHO COM FOTO E NOME */}
        <div className="flex items-center gap-4">
          <img
            src={
              cliente.foto && cliente.foto !== "string"
                ? cliente.foto
                : `https://ui-avatars.com/api/?name=${cliente.nome}&background=075985&color=fff`
            }
            alt={`Foto de ${cliente.nome}`}
            className="w-14 h-14 rounded-full object-cover border-2 border-sky-800"
          />
          <div>
            <h1 className="text-sky-800 text-base font-semibold uppercase tracking-wider leading-tight">
              {cliente.nome}
            </h1>
            <p className="text-black text-sm font-medium leading-none mt-1">
              Cliente
            </p>
          </div>
        </div>

        {/* Grid para os campos de dados */}
        <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm leading-relaxed mt-2">
          <span className="text-sky-800">E-mail:</span>
          <span className="text-black font-medium">{cliente.email}</span>

          <span className="text-sky-800">Telefone:</span>
          <span className="text-black font-medium">{cliente.telefone}</span>

          <span className="text-sky-800">Nascimento:</span>
          {/* O "T00:00:00" evita que o fuso horário mude o dia do aniversário */}
          <span className="text-black font-medium">
            {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
              new Date(cliente.data_nascimento + "T00:00:00"),
            )}
          </span>

          <span className="text-sky-800 font-semibold mt-2">Apólices:</span>
          <span className="text-black font-semibold mt-2">
            {/* Mostra a quantidade de apólices que o cliente tem */}
            {cliente.apolice?.length || 0} contratada(s)
          </span>
        </div>
      </div>

      {/* RODAPÉ COM BOTÕES */}
      <div className="grid grid-cols-2 border-t border-sky-800/20 bg-sky-800/5 mt-auto">
        <Link
          to={`/editarcliente/${cliente.id}`}
          className="grid grid-flow-col justify-center items-center gap-2.5 py-4 text-sky-800 text-xs font-semibold uppercase tracking-widest border-r 
                    border-sky-800/20 hover:bg-sky-800/10 transition-colors duration-200"
        >
          <span>✎</span> EDITAR
        </Link>
        <Link
          to={`/deletarcliente/${cliente.id}`}
          className="grid grid-flow-col justify-center items-center gap-2.5 py-4 text-sky-800 text-xs font-semibold uppercase tracking-widest hover:bg-sky-800/10 transition-colors duration-200"
        >
          <span>✕</span> DELETAR
        </Link>
      </div>
    </div>
  );
}

export default CardCliente;
