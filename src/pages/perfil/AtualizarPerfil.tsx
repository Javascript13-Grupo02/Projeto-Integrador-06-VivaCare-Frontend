import { type ChangeEvent, type SyntheticEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Usuario from "../../models/Usuario"
import { atualizar, buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"

function AtualizarPerfil() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<Usuario>({} as Usuario)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token
  const id: string = usuario.id.toString()

  async function buscarUsuarioPorId() {
    try {
      await buscar(`/usuarios/${id}`, setUser, {
        headers: { Authorization: token },
      })
      setUser((user) => ({ ...user, senha: "" }))
      setConfirmarSenha("")
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      } else {
        ToastAlerta('Usuário não encontrado!', 'info')
        retornar()
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta('É preciso estar logado para realizar esta ação', 'info')
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    setUser({} as Usuario)
    setConfirmarSenha("")
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      buscarUsuarioPorId()
    }
  }, [id])

  function retornar() {
    navigate("/perfil")
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  async function atualizarUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (confirmarSenha === user.senha && user.senha.length >= 8) {
      try {
        await atualizar(`/usuarios/atualizar`, user, setUser, {
          headers: { Authorization: token },
        })
        ToastAlerta('Usuário atualizado! Efetue o Login Novamente.', 'info')
        handleLogout()
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar o usuário', 'erro')
          retornar()
        }
      }
    } else {
      ToastAlerta('Dados inconsistentes. Verifique as informações do usuário.', 'info')
      setUser({ ...user, senha: "" })
      setConfirmarSenha("")
    }

    setIsLoading(false)
  }

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
          <div className="flex justify-center -mt-14 relative z-10">
            <img
          src={
              usuario.foto && usuario.foto !== "string"
                  ? usuario.foto
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nome)}&background=075985&color=fff`
              } 
              alt={`Foto de ${user.nome}`}
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* Formulário */}
          <div className="px-8 pb-8 pt-4">

            <h1 className="text-2xl font-bold text-sky-900 text-center mb-1">{user.nome}</h1>
            <p className="text-slate-500 text-sm text-center mb-6">{user.usuario}</p>

            <div className="w-full h-px bg-slate-200 mb-6" />

            <form onSubmit={atualizarUsuario} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1.5">
                <label htmlFor="nome" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Nome completo"
                  required
                  className="border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-800 transition-colors"
                  value={user.nome || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="usuario" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  E-mail
                </label>
                <input
                  type="email"
                  id="usuario"
                  name="usuario"
                  disabled
                  className="border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
                  value={user.usuario || ""}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="foto" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  URL da Foto
                </label>
                <input
                  type="url"
                  id="foto"
                  name="foto"
                  placeholder="Link da imagem"
                  required
                  className="border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-800 transition-colors"
                  value={user.foto || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="senha" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Nova Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-800 transition-colors"
                  value={user.senha || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmarSenha" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="Repita a nova senha"
                  required
                  minLength={8}
                  className="border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-800 transition-colors"
                  value={confirmarSenha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmarSenha(e.target.value)}
                />
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={retornar}
                  className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold uppercase tracking-widest hover:bg-slate-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl bg-sky-800 hover:bg-sky-900 text-white text-sm font-semibold uppercase tracking-widest flex justify-center transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading
                    ? <ClipLoader color="#ffffff" size={16} />
                    : <span>Atualizar</span>
                  }
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AtualizarPerfil
