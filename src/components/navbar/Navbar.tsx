import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
//import { AuthContext } from "../../contexts/AuthContext";
//import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    //const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        //handleLogout()
        //ToastAlerta('O Usuário foi desconectado com sucesso!', 'sucesso')
        navigate('/')
    }

    let component: ReactNode
    let componentLogin: ReactNode
    

    
    component = ( 
        <div className='w-full flex justify-center py-4 bg-sky-800 text-white'>
            <div className="container flex justify-between text-lg mx-8">
                <Link to='/home' className="text-2xl font-bold">

                    <img
                        src=""
                        alt=""
                       // className="h-9 w-auto"
                    />
                    VivaCare
                </Link>

                <div className='flex gap-4'>
                    <Link to='/sobre' className='hover:text-[#45a8f0] transition-colors'>Sobre</Link>
                    <Link to='/equipe' className='hover:text-[#45a8f0] transition-colors'>Equipe</Link>
                    <Link to='/login' className='hover:text-[#45a8f0] transition-colors'>Entrar</Link>
                </div>
            </div>
        </div>
    )
    

    //if (usuario.token !== ""){
    componentLogin = ( 
        <div className='w-full flex justify-center py-4 bg-sky-800 text-white'>
            <div className="container flex justify-between text-lg mx-8">
                <Link to='/home' className="text-2xl font-bold">

                    <img
                        src=""
                        alt=""
                       // className="h-9 w-auto"
                    />
                    VivaCare
                </Link>

                <div className='flex gap-4'>
                    <Link to='/apolice' className='hover:text-[#45a8f0] transition-colors'>Apólice</Link>
                    <Link to='/cliente' className='hover:text-[#45a8f0] transition-colors'>Cliente</Link>
                    <Link to='/sobre' className='hover:text-[#45a8f0] transition-colors'>Sobre</Link>
                    <Link to='/equipe' className='hover:text-[#45a8f0] transition-colors'>Equipe</Link>
                    <Link to='' onClick={logout} className='hover:text-[#45a8f0] transition-colors'>Sair</Link>
                </div>
            </div>
        </div>
    )
    //}

    return (
        <>
            {component}
        </>
    )
}

export default Navbar