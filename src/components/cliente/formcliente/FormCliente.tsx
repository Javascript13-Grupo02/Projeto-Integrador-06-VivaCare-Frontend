import React, { useState, type SyntheticEvent } from "react";
import type Cliente from "../../../models/Cliente";
import { podeCadastrar } from "../../../models/Cliente";
import { AtIcon, CalendarIcon, CameraIcon, UserIcon } from "@phosphor-icons/react";



export default function FormCliente() {
	const [form, setForm] = useState<Omit<Cliente, "id" | "apolices">>({
		nome: "",
		email: "",
		data_nascimento: "",
		foto: ""
	});
	const [mensagem, setMensagem] = useState("");
	const [erro, setErro] = useState("");
	const [loading, setLoading] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		setMensagem("");
		setErro("");


		// Validação nome
		if (!form.nome.trim()) {
			setErro("<strong>Preencha o nome.</strong>");
			return;
		}

		// Validação maioridade
		const clienteFake: Cliente = { ...form, id: 0, apolices: [] };
		if (!podeCadastrar(clienteFake)) {
			setErro("<strong>Cadastro não permitido:</strong> é necessário ter 18 anos ou mais para contratar uma apólice.");
			return;
		}

		setLoading(true);
		try {
			const payload = { ...form };
			const resp = await fetch("https://vivacare.onrender.com/clientes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			if (!resp.ok) throw new Error("Erro ao cadastrar cliente");
			setMensagem("Cliente cadastrado com sucesso!");
			setForm({ nome: "", email: "", data_nascimento: "", foto: "" });
		} catch (e: any) {
			setErro(e.message || "Erro desconhecido");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex items-center justify-center pb-4 min-h-screen bg-linear-to-br from-white to-sky-200">
			<div className="flex flex-col justify-center rounded-2xl bg-sky-800 text-slate-100 w-240 min-h-150 my-4 mx-4 px-8 py-8 shadow-2xl transition-all">
				<form onSubmit={handleSubmit} className="flex flex-col columns-1 justify-start gap-4 mt-3 mb-8 mx-8 w-full">
					<h2 className="font-bold text-3xl mt-8 mb-12 text-slate-100">Cadastrar Cliente</h2>

					{/* Nome */}
					<div className="flex flex-col gap-1.5">
						<div className="flex flex-row items-center gap-0.5">
							<UserIcon size={20} color="#f1f5f9" weight="bold" />
							<label htmlFor="nome" className="font-bold text-slate-100">Nome</label>
						</div>
						<input
							type="text"
							placeholder="Digite o seu nome"
							id="nome"
							name="nome"
							required
							value={form.nome}
							onChange={handleChange}
							className="border-2 rounded-xl py-2 px-4 w-6/10 bg-white text-black focus:outline-none"
						/>
					</div>

					{/* Email */}
					<div className="flex flex-col gap-1.5">
						<div className="flex flex-row items-end gap-0.5">
							<AtIcon size={20} color="#f1f5f9" weight="bold" />
							<label htmlFor="email" className="font-bold text-slate-100">E-mail</label>
						</div>
						<input
							type="email"
							placeholder="example@example.com"
							id="email"
							name="email"
							required
							value={form.email}
							onChange={handleChange}
							className="border-2 rounded-xl py-2 px-4 w-7/10 bg-white text-black focus:outline-none"
						/>
					</div>

					{/* Data de nascimento */}
					<div className="flex flex-col gap-1.5">
						<div className="flex flex-row items-end gap-0.5">
							<CalendarIcon size={20} color="#f1f5f9" weight="bold" />
							<label htmlFor="data_nascimento" className="font-bold text-slate-100">Data de nascimento</label>
						</div>
						<input
							type="date"
							id="data_nascimento"
							name="data_nascimento"
							required
							value={form.data_nascimento}
							onChange={handleChange}
							className="border-2 rounded-xl py-2 px-4 w-7/10 bg-white text-black focus:outline-none"
						/>
					</div>

					{/* Foto */}
					<div className="flex flex-col gap-1.5">
						<div className="flex flex-row items-end gap-0.5">
							<CameraIcon size={20} color="#f1f5f9" weight="bold" />
							<label htmlFor="foto" className="font-bold text-slate-100">Foto (opcional)</label>
						</div>
						<input
							type="text"
							id="foto"
							name="foto"
							placeholder="URL da foto (opcional)"
							value={form.foto}
							onChange={handleChange}
							className="border-2 rounded-xl py-2 px-4 w-7/10 bg-white text-black focus:outline-none"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="flex justify-center items-center leading-1.5 mt-2.5 w-9/10 p-4 rounded-lg text-white font-bold text-md bg-slate-800 hover:bg-slate-500 inset-1"
					>
						{loading ? "Cadastrando..." : "Cadastrar"}
					</button>
					{mensagem && <div className="text-green-600 font-semibold">{mensagem}</div>}
					{erro && <div className="text-slate-100 font-semibold" dangerouslySetInnerHTML={{ __html: erro }} />}
				</form>
			</div>
		</div>
	);
}
