import { useContext, useEffect, useState } from "react";
import { buscar, deletar } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Apolice from "../../../models/Apolice";

function DeletarApolice() {
    const navigate = useNavigate();
    const [apolice, setApolice] = useState<Apolice>({} as Apolice)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
    if (token === '') {
        ToastAlerta('Você precisa estar logado!', 'info')
        navigate('/')
    }
    }, [token])

    useEffect(() => {
        if (token !== '' && id !== undefined) { 
            buscarPorId(id)
        }
    }, [id, token]) // 

    async function buscarPorId(id: string) {
        try {
            await buscar(`/apolices/${id}`, setApolice, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function deletarApolice() {
        setIsLoading(true)
        try {
            await deletar(`/apolices/${id}`, {
                headers: { Authorization: token }
            });
            ToastAlerta('Apólice apagada com sucesso.', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a Apólice.', 'erro')
            }
        } finally {
            setIsLoading(false)
            navigate('/apolices')
        }
    }

    return (
        <div className="container w-1/3 mx-auto">
            <h1 className="text-4xl text-center my-4">Deletar Apólice</h1>
            <p className="text-center font-semibold mb-4">
                Você tem certeza de que deseja apagar a apólice a seguir?
            </p>
            <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
                <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
                    Apólice
                </header>

                <p className="p-8 text-3xl bg-slate-200 h-full">
                    {apolice?.cliente?.nome ?? 'Carregando...'}
                </p>
                <p className="px-8 pb-4">{apolice?.plano}</p>

                <div className="flex">
                    <button
                        className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
                        onClick={() => navigate('/apolices')}
                    >
                        Não
                    </button>
                    <button
                        className="text-slate-100 bg-indigo-400 hover:bg-indigo-600 w-full py-2 flex justify-center"
                        onClick={deletarApolice}
                    >
                        {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Sim</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarApolice;