import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Apolice from "../../../models/Apolice";
import type Cliente from "../../../models/Cliente";

function formatarData(valor: string | undefined): string {
    if (!valor) return '';
    return valor.split('T')[0];
}

function FormApolice() {
    const planos = ['VivaCare Gold', 'VivaCare Premium', 'VivaCare Plus+', 'VivaCare Basic'];

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apolice, setApolice] = useState<Apolice>({} as Apolice);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [buscaCliente, setBuscaCliente] = useState<string>('');
    const [tentouEnviar, setTentouEnviar] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout, isLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarClientes(nome: string) {
        if (nome.length < 3) {
            setClientes([]);
            return;
        }
        try {
            await buscar(`/clientes/nome/${nome}`, setClientes, { headers: { Authorization: token } });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            } else {
                ToastAlerta("Erro ao buscar clientes.", "erro");
            }
        }
    }

    function selecionarCliente(cliente: Cliente) {
        setApolice(prev => ({ ...prev, cliente }));
        setClientes([]);
        setBuscaCliente(cliente.nome);
    }

    useEffect(() => {
        if (token === '') {
            if (!isLogout) {
                ToastAlerta('Você precisa estar logado!', 'info');
            }
            navigate('/');
            return;
        }

        if (id === undefined) {
            setApolice(prev => ({ ...prev, usuario }));
            return;
        }

        let cancelado = false;

        async function fetchApolice() {
            try {
                await buscar(
                    `/apolices/id/${id}`,
                    (dados: any) => {
                        if (cancelado) return; // descarta resultado de chamada cancelada

                        if (dados?.statusCode === 401 || dados?.message === 'Unauthorized') {
                            ToastAlerta('Sessão expirada. Faça login novamente.', 'info');
                            navigate('/');
                            return;
                        }

                        setApolice({
                            ...dados,
                            data_inicio: formatarData(dados.data_inicio),
                            data_fim: formatarData(dados.data_fim),
                        });

                        if (dados.cliente?.nome) {
                            setBuscaCliente(dados.cliente.nome);
                        }
                    },
                    { headers: { Authorization: token } }
                );
            } catch (error: any) {
                if (cancelado) return;
                ToastAlerta('Erro ao buscar apólice.', 'erro');
            }
        }

        fetchApolice();
        // Cleanup: quando o React desmonta (StrictMode ou troca de rota),
        // marca cancelado para ignorar qualquer setState pendente
        return () => {
            cancelado = true;
        };
    }, [token, id, isLogout, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;
        
        // Se o campo for de número e estiver vazio, passamos string vazia para o 0 não ficar preso.
        const valorFinal = type === 'number' ? (value === '' ? '' : Number(value)) : value;

        setApolice(prev => ({
            ...prev,
            [name]: valorFinal,
            usuario: prev.usuario ?? usuario,
        }));
    }

    async function gerarNovaApolice(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setTentouEnviar(true);

        if (!apolice.cliente?.id || !apolice.plano || !apolice.preco || apolice.dependentes === undefined || String(apolice.dependentes) === '' || !apolice.data_inicio || !apolice.data_fim) {
            ToastAlerta('Por favor, preencha todos os campos em vermelho!', 'erro');
            return;
        }

        setIsLoading(true);
        try {
            if (id !== undefined) {
                await atualizar(`/apolices/atualizar`, apolice, setApolice, { headers: { Authorization: token } });
                ToastAlerta('Apólice atualizada com sucesso!', 'sucesso');
            } else {
                await cadastrar(`/apolices/cadastrar`, apolice, setApolice, { headers: { Authorization: token } });
                ToastAlerta('Apólice cadastrada com sucesso!', 'sucesso');
            }
            navigate('/apolices');
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            } else {
                ToastAlerta('Erro ao processar a Apólice.', 'erro');
            }
        } finally {
            setIsLoading(false);
        }
    }

    const inputClass = "border-2 border-slate-300 rounded-xl p-3 focus:outline-none focus:border-sky-800 w-full bg-white text-slate-800 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 transition-colors duration-300";
    const labelClass = "font-semibold text-sky-900 dark:text-slate-100";

    const formContent = (
        <>
            <h1 className="text-3xl text-sky-800 text-center font-bold mb-8 dark:text-slate-100">
                {id !== undefined ? 'Editar Apólice' : 'Cadastrar Apólice'}
            </h1>

            <form
                className="flex flex-col gap-5 w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-sky-200 dark:bg-slate-900 dark:text-slate-100"
                onSubmit={gerarNovaApolice}
            >
                {/* Busca de Cliente */}
                <div className="flex flex-col gap-2 relative">
                    <label className={labelClass}>Pesquisar/Alterar Cliente</label>
                    <input
                        type="text"
                        placeholder="Digite o nome do cliente..."
                        className={`${inputClass} ${tentouEnviar && !apolice.cliente?.id ? "border-red-500" : "border-slate-300"}`}
                        value={buscaCliente}
                        onChange={(e) => {
                            setBuscaCliente(e.target.value);
                            buscarClientes(e.target.value);
                        }}
                    />
                    {clientes.length > 0 && (
                        <div className="absolute z-10 top-20 w-full bg-white border border-sky-200 rounded-xl shadow-xl flex flex-col">
                            {clientes.map(c => (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => selecionarCliente(c)}
                                    className="p-3 text-left hover:bg-sky-50 border-b last:border-0 first:rounded-t-xl last:rounded-b-xl"
                                >
                                    <p className="font-bold text-sky-800">{c.nome}</p>
                                    <p className="text-xs text-gray-500">{c.email}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cliente confirmado */}
                {apolice.cliente?.id && (
                    <div className="bg-sky-50 p-4 rounded-xl flex flex-col gap-1 border border-sky-200 dark:bg-slate-800 dark:border-slate-600">
                        <p className="text-xs text-sky-800 font-bold uppercase dark:text-sky-400">Cliente Vinculado:</p>
                        <p className="font-semibold text-sky-900 dark:text-slate-100">{apolice.cliente.nome}</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">{apolice.cliente.email}</p>
                    </div>
                )}

                {/* Plano */}
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>Plano</label>
                    <select
                        name="plano"
                        className="border-2 border-slate-300 rounded-xl p-3 focus:outline-none focus:border-sky-800 w-full bg-white text-slate-800 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 transition-colors duration-300"
                        onChange={atualizarEstado}
                        value={apolice.plano || ''}
                    >
                        <option value="" disabled>Selecione um plano</option>
                        {planos.map(plano => (
                            <option key={plano} value={plano}>{plano}</option>
                        ))}
                    </select>
                    <div className="bg-sky-50 p-4 rounded-xl flex flex-col gap-1 border border-sky-200 dark:bg-slate-800 dark:border-slate-600">
                            <p className="text-xs text-sky-800 font-bold uppercase dark:text-sky-400">Plano selecionado:</p>
                            <p className="font-semibold text-sky-900 dark:text-slate-100">{apolice.plano}</p>
                    </div>
                </div>

                {/* Preço e Dependentes */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Preço</label>
                        <input
                            type="number"
                            name="preco"
                            placeholder="R$ 0,00"
                            className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${tentouEnviar && !apolice.preco ? "border-red-500" : "border-slate-300"}`}
                            onChange={atualizarEstado}
                            value={apolice.preco ?? ''}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Dependentes</label>
                        <input
                            type="number"
                            name="dependentes"
                            className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${tentouEnviar && (apolice.dependentes === undefined || String(apolice.dependentes) === '') ? "border-red-500" : "border-slate-300"}`}
                            onChange={atualizarEstado}
                            value={apolice.dependentes ?? ''}
                        />
                    </div>
                </div>

                {/* Datas */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Início</label>
                        <input
                            type="date"
                            name="data_inicio"
                            className={`${inputClass} ${tentouEnviar && !apolice.data_inicio ? "border-red-500" : "border-slate-300"}`}
                            onChange={atualizarEstado}
                            value={apolice.data_inicio || ''}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Fim</label>
                        <input
                            type="date"
                            name="data_fim"
                            className={`${inputClass} ${tentouEnviar && !apolice.data_fim ? "border-red-500" : "border-slate-300"}`}
                            onChange={atualizarEstado}
                            value={apolice.data_fim || ''}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-2 bg-sky-800 text-white font-bold py-3 rounded-xl hover:bg-sky-900 transition-colors flex justify-center dark:border dark:border-slate-200  dark:bg-slate-700 dark:hover:bg-slate-600"
                >
                    {isLoading ? <ClipLoader size={20} color="#fff" /> : (id ? 'Atualizar' : 'Cadastrar')}
                </button>
            </form>
        </>
    );

    if (id !== undefined) {
        return (
            <div className="min-h-screen flex flex-col items-center py-16 px-4 w-full dark:bg-transparent">
                {formContent}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center px-4 py-4 w-full dark:bg-transparent">
            {formContent}
        </div>
    );
}

export default FormApolice;
