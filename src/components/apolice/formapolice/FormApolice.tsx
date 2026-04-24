import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Apolice from "../../../models/Apolice";
import type Cliente from "../../../models/Cliente";

function FormApolice() {

    const planos = ['VivaCare Gold', 'VivaCare Premium', 'VivaCare Plus+', 'VivaCare Basic'];

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apolice, setApolice] = useState<Apolice>({} as Apolice);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [buscaCliente, setBuscaCliente] = useState<string>('');

    const { id } = useParams<{ id: string }>();
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarApolicePorId(id: string) {
        try {
            await buscar(`/apolices/${id}`, setApolice, { headers: { Authorization: token } });
        } catch (error: any) {}
    }

    async function buscarClientes(nome: string) {
        if (nome.length < 3) return;
        try {
            await buscar(`/clientes/nome/${nome}`, setClientes, { headers: { Authorization: token } });
        } catch (error) {
            console.error("Erro ao buscar clientes");
        }
    }

    function selecionarCliente(cliente: Cliente) {
        setApolice({ ...apolice, cliente: cliente });
        setClientes([]);
        setBuscaCliente(cliente.nome);
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
        if (id !== undefined) {
            buscarApolicePorId(id);
        } else {
            setApolice(prev => ({ ...prev, usuario: usuario }));
        }
    }, [token, id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const valor = e.target.value;
        const valorFinal = e.target.type === 'number' ? Number(valor) : valor;
        setApolice({ ...apolice, [e.target.name]: valorFinal, usuario: usuario });
    }

    async function gerarNovaApolice(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (id !== undefined) {
                await atualizar(`/apolices`, apolice, setApolice, { headers: { Authorization: token } });
                ToastAlerta('Apolice atualizada com sucesso!', 'sucesso');
            } else {
                await cadastrar(`/apolices`, apolice, setApolice, { headers: { Authorization: token } });
                ToastAlerta('Apolice cadastrada com sucesso!', 'sucesso');
            }
            navigate('/apolices');
        } catch (error) {
            ToastAlerta('Erro ao processar a Apolice.', 'erro');
        }
        setIsLoading(false);
    }

    const inputClass = "border-2 border-slate-300 rounded-xl p-3 focus:outline-none focus:border-sky-800 w-full";
    const labelClass = "font-semibold text-sky-900";

    const formContent = (
        <>
            <h1 className="text-3xl text-sky-800 text-center font-bold mb-8">
                {id !== undefined ? 'Editar Apólice' : 'Cadastrar Apólice'}
            </h1>

            <form className="flex flex-col gap-5 w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-sky-200" onSubmit={gerarNovaApolice}>

                {/* Busca de Cliente */}
                <div className="flex flex-col gap-2 relative">
                    <label className={labelClass}>Pesquisar Cliente</label>
                    <input
                        type="text"
                        placeholder="Digite o nome do cliente..."
                        className={inputClass}
                        onChange={(e) => {
                            setBuscaCliente(e.target.value);
                            buscarClientes(e.target.value);
                        }}
                        value={buscaCliente}
                    />
                    {clientes.length > 0 && (
                        <div className="absolute z-10 top-20 w-full bg-white border border-sky-200 rounded-xl shadow-xl flex flex-col">
                            {clientes.map(c => (
                                <button key={c.id} type="button" onClick={() => selecionarCliente(c)}
                                    className="p-3 text-left hover:bg-sky-50 border-b last:border-0 first:rounded-t-xl last:rounded-b-xl">
                                    <p className="font-bold text-sky-800">{c.nome}</p>
                                    <p className="text-xs text-gray-500">{c.email}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cliente confirmado */}
                {apolice.cliente?.id && (
                    <div className="bg-sky-50 p-4 rounded-xl flex flex-col gap-1 border border-sky-200">
                        <p className="text-xs text-sky-800 font-bold uppercase">Cliente Confirmado:</p>
                        <p className="font-semibold text-sky-900">{apolice.cliente.nome}</p>
                        <p className="text-sm text-gray-500">{apolice.cliente.email}</p>
                    </div>
                )}

                {/* Plano */}
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>Plano</label>
                    <select name="plano"
                        className="border-2 border-slate-300 rounded-xl p-3 focus:outline-none focus:border-sky-800 w-full bg-white"
                        onChange={atualizarEstado} value={apolice.plano || ''}>
                        <option value="" disabled>Selecione um plano</option>
                        {planos.map(plano => (
                            <option key={plano} value={plano}>{plano}</option>
                        ))}
                    </select>
                    {apolice.plano && (
                        <p className="text-xs text-sky-600 font-medium">Plano selecionado: {apolice.plano}</p>
                    )}
                </div>

                {/* Preço e Dependentes */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Preço</label>
                        <input type="number" name="preco" placeholder="R$ 0,00"
                            className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                            onChange={atualizarEstado} value={apolice.preco} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Dependentes</label>
                        <input type="number" name="dependentes"
                            className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                            onChange={atualizarEstado} value={apolice.dependentes} />
                    </div>
                </div>

                {/* Datas */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Início</label>
                        <input type="date" name="data_inicio" className={inputClass}
                            onChange={atualizarEstado} value={apolice.data_inicio} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Fim</label>
                        <input type="date" name="data_fim" className={inputClass}
                            onChange={atualizarEstado} value={apolice.data_fim} />
                    </div>
                </div>

                <button type="submit"
                    className="mt-2 bg-sky-800 text-white font-bold py-3 rounded-xl hover:bg-sky-900 transition-colors flex justify-center">
                    {isLoading ? <ClipLoader size={20} color="#fff" /> : (id ? 'Atualizar' : 'Cadastrar')}
                </button>
            </form>
        </>
    );

    // Página solo (edição)
    if (id !== undefined) {
        return (
            <div className="min-h-screen flex flex-col items-center py-16 px-4 w-full">
                {formContent}
            </div>
        );
    }

    // Modal (cadastro)
    return (
        <div className="flex flex-col items-center px-4 py-4 w-full">
            {formContent}
        </div>
    );
}

export default FormApolice;
