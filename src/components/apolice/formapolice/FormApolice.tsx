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
            await buscar(`/apolices/${id}`, setApolice, 
                { headers: { Authorization: token } 
            });
        } catch (error: any){} 
    }

    async function buscarClientes(nome: string) {
        if (nome.length < 3) 
            return
        try {
            await buscar(`/clientes/nome/${nome}`, setClientes, {
                 headers: { Authorization: token } 
            });
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
        setApolice(prev => ({
            ...prev,
            usuario: usuario 
        }));
    }
}, [token, id]);

  



    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
   
    const valor = e.target.value;
    
    const valorFinal = e.target.type === 'number' ? Number(valor) : valor;

    setApolice({
        ...apolice,
        [e.target.name]: valorFinal,
        usuario: usuario
    });
}

    async function gerarNovaApolice(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id !== undefined) {
                await atualizar(`/apolices`, apolice, setApolice, 
                    { headers: { Authorization: token } 
                });
                ToastAlerta('Apolice atualizada com sucesso!', 'sucesso');
            } else {
                await cadastrar(`/apolices`, apolice, setApolice, 
                    { headers: { Authorization: token } 
                });
                ToastAlerta('Apolice cadastrada com sucesso!', 'sucesso');
            }
            navigate('/apolices');
        } catch (error) {
            ToastAlerta('Erro ao processar a Apolice.', 'erro');
        }
        setIsLoading(false);
    }

    return (

        <div className="container mx-auto my-10 w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
            <h1 className="text-3xl text-sky-800 text-center font-bold mb-8">
                {id !== undefined ? 'Editar Apólice' : 'Cadastrar Apólice'}
            </h1>

            
                <form className="grid grid-cols-1 gap-5" onSubmit={gerarNovaApolice}>

                    <div className="grid gap-5">
                        {/* Campo de Busca de Cliente */}
                        <div className="grid gap-2 relative">
                            <label className="font-semibold text-sky-800">Pesquisar Cliente</label>
                            <input 
                                type="text" 
                                placeholder="Digite o nome do cliente..."
                                className="border-2 p-3 rounded-lg border-sky-200"
                                onChange={(e) => {
                                    setBuscaCliente(e.target.value);
                                    buscarClientes(e.target.value);
                                }}
                                value={buscaCliente}
                            />
                            
                            {/* Dropdown de Resultados */}
                            {clientes.length > 0 && (
                                <div className="absolute z-10 top-20 w-full bg-white border border-sky-200 rounded-lg shadow-xl grid">
                                    {clientes.map(c => (
                                        <button 
                                            key={c.id} 
                                            type="button" 
                                            onClick={() => selecionarCliente(c)}
                                            className="p-3 text-left hover:bg-sky-50 border-b last:border-0"
                                        >
                                            <p className="font-bold text-sky-800">{c.nome}</p>
                                            <p className="text-xs text-gray-500">{c.email}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirmação do Cliente Selecionado */}
                        {apolice.cliente?.id && (
                            <div className="bg-sky-100 p-4 rounded-lg grid gap-1 border border-sky-300">
                                <p className="text-xs text-sky-800 font-bold uppercase">Cliente Confirmado:</p>
                                <p className="font-semibold text-black">{apolice.cliente.nome}</p>
                                <p className="text-sm text-gray-600">{apolice.cliente.email}</p>
                            </div>
                        )}

                    </div>
                
                {/* PLANOS (Select) */}
                <div className="grid gap-2">
                    <label className="font-semibold text-sky-800">Plano</label>
                    <select name="plano" className="border-2 p-3 rounded-lg border-sky-200 focus:border-sky-500 outline-none" 
                        onChange={atualizarEstado} 
                        value={apolice.plano || ''}>

                        <option value="" disabled>Selecione um plano</option>
                        {planos.map(plano => (
                            <option key={plano} value={plano}>
                                {plano} {apolice.plano === plano && '✓'} 
                            </option>
                        ))}
                    </select>
                    {/* Feedback visual extra */}
                    {apolice.plano && (
                        <p className="text-xs text-sky-600 font-medium">Plano selecionado: {apolice.plano}</p>
                    )}
                </div>

                {/* PREÇO */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label className="font-semibold text-sky-800">Preço</label>
                        <input type="number"
                                name="preco" 
                                className="border-2 p-3 rounded-lg border-sky-200 [appearance:textfield] 
                                            [&::-webkit-outer-spin-button]:appearance-none 
                                            [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="R$ 0,00"
                                onChange={atualizarEstado} value={apolice.preco} /> 
                    </div>

                    {/* DEPENDENTES  */}
                    <div className="grid gap-2">
                        <label className="font-semibold text-sky-800">Dependentes</label>
                        <input type="number" 
                            name="dependentes" 
                               className="border-2 p-3 rounded-lg border-sky-200 [appearance:textfield] 
                                            [&::-webkit-outer-spin-button]:appearance-none 
                                            [&::-webkit-inner-spin-button]:appearance-none" 
                        onChange={atualizarEstado} value={apolice.dependentes} />
                    </div>
                </div>
                    
                    {/* DATA DE INICIO  */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label className="font-semibold text-sky-800">Início</label>
                        <input type="date" name="data_inicio" className="border-2 p-3 rounded-lg border-sky-200" 
                        onChange={atualizarEstado} value={apolice.data_inicio} />
                    </div>

                    {/* DATA DE FIM  */}
                    <div className="grid gap-2">
                        <label className="font-semibold text-sky-800">Fim</label>
                        <input type="date" name="data_fim" className="border-2 p-3 rounded-lg border-sky-200" 
                        onChange={atualizarEstado} value={apolice.data_fim} />
                    </div>
                </div>

                <button type="submit" className="mt-4 bg-sky-800 text-white font-bold py-3 rounded-lg hover:bg-sky-900 transition-colors">
                    {isLoading ? <ClipLoader size={20} color="#fff" /> : (id ? 'Atualizar' : 'Cadastrar')}
                </button>
            </form>
        </div>
    );
}

export default FormApolice;