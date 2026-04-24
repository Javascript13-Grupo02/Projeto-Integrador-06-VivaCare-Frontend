import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
  const navigate = useNavigate()

  const { usuario } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    if (token === "") {
      ToastAlerta('É preciso estar logado para acessar a página', 'info')
      navigate("/")
    }
  }, [token])

  return (
    <div className="flex items-start justify-center w-full">
      <div className="w-full max-w-2xl">

        {/* Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">

          {/* Capa */}
          <div className="relative h-40 bg-linear-to-r from-sky-950 via-sky-800 to-sky-500">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-14 relative z-10 px-8">
            <img
              src={
              usuario.foto && usuario.foto !== "string"
                  ? usuario.foto
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nome)}&background=075985&color=fff`
              } 
              alt={`Foto de ${usuario.nome}`}
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* Corpo */}
          <div className="px-8 pb-8 pt-4 flex flex-col items-center">

            <h1 className="text-2xl font-bold text-sky-900 mt-1">{usuario.nome}</h1>
            <p className="text-slate-500 text-sm mb-6">{usuario.usuario}</p>

            <div className="w-full h-px bg-slate-200 mb-6" />

            {/* Informações */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Nome</p>
                <p className="text-sm font-medium text-slate-800">{usuario.nome}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">E-mail</p>
                <p className="text-sm font-medium text-slate-800">{usuario.usuario}</p>
              </div>
            </div>

            {/* Botão */}
            <button
              onClick={() => navigate('/atualizarusuario')}
              className="w-full py-3 rounded-xl bg-sky-800 hover:bg-sky-900 text-white text-sm font-semibold uppercase tracking-widest transition-colors duration-200"
            >
              ✎ Editar Perfil
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil
