// Importa hooks do React e componentes/tipos necessários
import { useEffect, useState } from "react";
import CardCliente from "../cardcliente/CardCliente";
import type Cliente from "../../../models/Cliente";


// Componente funcional para listar todos os clientes
export default function ListaCliente() {
	// Estado para armazenar a lista de clientes
	const [clientes, setClientes] = useState<Cliente[]>([]);
	// Estado para indicar carregamento
	const [loading, setLoading] = useState(true);
	// Estado para mensagem de erro
	const [erro, setErro] = useState("");


		// Busca os clientes na API ao montar o componente
		useEffect(() => {
			async function fetchClientes() {
				try {
					// Requisição GET para buscar clientes
					const resp = await fetch("https://vivacare.onrender.com/clientes");
					if (!resp.ok) throw new Error("Erro ao buscar clientes");
					const data = await resp.json();
					setClientes(data); // Atualiza o estado com os clientes recebidos
				} catch (e: any) {
					setErro(e.message || "Erro desconhecido"); // Exibe erro, se houver
				} finally {
					setLoading(false); // Finaliza carregamento
				}
			}
			fetchClientes();
		}, []);


		// Exibe mensagem de carregamento ou erro, se necessário
		if (loading) return <div>Carregando clientes...</div>;
		if (erro) return <div className="text-red-600">{erro}</div>;


		// Renderiza a lista de clientes usando o CardCliente
		return (
			<div className="flex flex-wrap gap-8 justify-center p-8">
				{clientes.length > 0 ? (
					// Para cada cliente, renderiza um card
					clientes.map((cliente) => (
						<CardCliente key={cliente.id} cliente={cliente} />
					))
				) : (
					// Caso não haja clientes cadastrados
					<div>Nenhum cliente encontrado.</div>
				)}
			</div>
		);
}
