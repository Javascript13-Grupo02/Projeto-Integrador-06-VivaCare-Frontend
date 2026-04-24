import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'sucesso')
        navigate('/')
    }

    let component: ReactNode
    let componentLogin: ReactNode
    
    component = ( 
        <div className='w-full flex justify-center py-4 bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 text-white'>
            <div className="container flex justify-between text-base sm:text-lg mx-8">
                <Link to='/home' className="text-xl sm:text-2xl font-bold">
                    <div className="flex gap-0.5 sm:gap-2">
                    <img
                        src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Logo%20VivaCare%20Clara.png?updatedAt=1777032061555"
                        alt=""
                       className="h-9 w-auto"
                    />
                    VivaCare
                    </div>
                </Link>

                <div className='flex gap-1 sm:gap-4'>
                    <Link to='/sobre' className='hover:text-[#45a8f0] transition-colors'>Sobre</Link>
                    <Link to='/equipe' className='hover:text-[#45a8f0] transition-colors'>Equipe</Link>
                    <Link to='/login' className='hover:text-[#45a8f0] transition-colors'>Entrar</Link>
                </div>
            </div>
        </div>
    )
    

    componentLogin = ( 
        <div className='w-full flex justify-center py-4 bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 text-white'>
            <div className="container flex justify-between text-lg mx-8">
                <Link to='/home' className="text-2xl font-bold">
                    <div className="flex gap-0.5 sm:gap-2">
                    <img
                        src="https://ik.imagekit.io/vjqejp2vh/VivaCare/Logo%20VivaCare%20Clara.png?updatedAt=1777032061555"
                        alt=""
                       className="h-9 w-auto"
                    />
                    VivaCare
                    </div>
                </Link>

                <div className='flex gap-1 sm:gap-4'>
                    <Link to='/apolices' className='hover:text-[#45a8f0] transition-colors hidden sm:flex gap-4'>Apólices</Link>
                    <Link to='/clientes' className='hover:text-[#45a8f0] transition-colors hidden sm:flex gap-4'>Clientes</Link>
                    <Link to='/sobre' className='hover:text-[#45a8f0] transition-colors'>Sobre</Link>
                    <Link to='/equipe' className='hover:text-[#45a8f0] transition-colors'>Equipe</Link>
                    <Link to='/perfil' className='hover:text-[#45a8f0] transition-colors'>Perfil</Link>
                    <Link to='' onClick={logout} className='hover:text-[#45a8f0] transition-colors'>Sair</Link>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {usuario.token !== '' ? componentLogin : component}
        </>
    )
}

export default Navbar