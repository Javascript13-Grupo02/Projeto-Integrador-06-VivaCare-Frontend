// Importa o tipo Cliente, que representa o modelo de dados do cliente
import type Cliente from "../../../models/Cliente";


// Define as propriedades esperadas pelo componente CardCliente
type CardClienteProps = {
	cliente: Cliente; // Objeto cliente a ser exibido no card
};

// Componente funcional que exibe as informações de um cliente em formato de card
export default function CardCliente({ cliente }: CardClienteProps) {
	return (
		// Card principal com estilização
		<div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-4 w-full max-w-sm border border-slate-200">
			{/* Exibe a foto do cliente, se houver */}
			{cliente.foto && (
				<img
					src={cliente.foto}
					alt={cliente.nome}
					className="w-24 h-24 rounded-full object-cover border-4 border-blue-300"
				/>
			)}
			<div className="text-center">
				{/* Nome do cliente em destaque */}
				<h2 className="text-xl font-bold text-blue-900">{cliente.nome}</h2>
				{/* E-mail do cliente */}
				<p className="text-slate-700">{cliente.email}</p>
				{/* Data de nascimento formatada */}
				<p className="text-slate-500 text-sm">
					Data de nascimento: {new Date(cliente.data_nascimento).toLocaleDateString()}
				</p>
				<div className="mt-2">
					{/* Título da seção de apólices */}
					<span className="font-semibold text-blue-800">Apólices:</span>
					{/* Lista de apólices do cliente, se houver */}
					<ul className="list-disc list-inside text-slate-700">
						{cliente.apolices && cliente.apolices.length > 0 ? (
							// Para cada apólice, exibe o plano e o preço
							cliente.apolices.map((apolice) => (
								<li key={apolice.id}>
									{apolice.plano} - R$ {apolice.preco.toFixed(2)}
								</li>
							))
						) : (
							// Caso não haja apólices cadastradas
							<li>Nenhuma apólice cadastrada</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
