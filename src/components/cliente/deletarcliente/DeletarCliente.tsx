// Importa o React e o hook useState para gerenciar estados locais

import { useState, type SyntheticEvent } from "react";



// Componente funcional para deletar um cliente pelo ID
export default function DeletarCliente() {
	// Estado para armazenar o ID do cliente a ser deletado
	const [id, setId] = useState("");
	// Estado para mensagem de sucesso
	const [mensagem, setMensagem] = useState("");
	// Estado para mensagem de erro
	const [erro, setErro] = useState("");
	// Estado para indicar carregamento
	const [loading, setLoading] = useState(false);


		// Função para lidar com o envio do formulário e deletar o cliente
		async function handleDelete(e: SyntheticEvent) {
			e.preventDefault(); // Evita o recarregamento da página
			setMensagem(""); // Limpa mensagens anteriores
			setErro("");
			setLoading(true); // Indica carregamento
			try {
				// Faz a requisição DELETE para a API
				const resp = await fetch(`https://vivacare.onrender.com/clientes/${id}`, {
					method: "DELETE",
				});
				if (!resp.ok) throw new Error("Erro ao deletar cliente");
				setMensagem("Cliente deletado com sucesso!"); // Sucesso
				setId(""); // Limpa o campo ID
			} catch (e: any) {
				setErro(e.message || "Erro desconhecido"); // Exibe erro
			} finally {
				setLoading(false); // Finaliza carregamento
			}
		}

		return (
			// Formulário centralizado para deletar cliente
			<form onSubmit={handleDelete} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow flex flex-col gap-4 mt-8">
				{/* Título do formulário */}
				<h2 className="text-xl font-bold text-red-700 mb-2">Deletar Cliente</h2>
				{/* Campo para digitar o ID do cliente */}
				<input
					type="number"
					name="id"
					placeholder="ID do cliente"
					value={id}
					onChange={e => setId(e.target.value)}
					required
					className="border p-2 rounded"
				/>
				{/* Botão de submit, desabilitado durante carregamento */}
				<button
					type="submit"
					disabled={loading}
					className="bg-red-700 text-white rounded p-2 font-bold hover:bg-red-800"
				>
					{loading ? "Deletando..." : "Deletar"}
				</button>
				{/* Mensagem de sucesso */}
				{mensagem && <div className="text-green-600 font-semibold">{mensagem}</div>}
				{/* Mensagem de erro */}
				{erro && <div className="text-red-600 font-semibold">{erro}</div>}
			</form>
		);
}
