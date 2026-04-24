import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function Login() {

  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token && usuario.token !== '') {
      navigate('/apolices')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85')" }}
    >
      {/* Overlay azul escuro */}
      <div className="absolute inset-0 bg-sky-950/60" />

      {/* Card de login */}
      <div className="relative z-10 bg-white rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.3)] p-10 w-full max-w-sm flex flex-col gap-5 mx-4">

        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-extrabold text-sky-900">VivaCare</h1>
          <p className="text-sm text-slate-500">Mais que cuidado, uma parceria de vida</p>
        </div>

        <div className="h-px bg-slate-200" />

        <form className="flex flex-col gap-4" onSubmit={login}>

          {/* Usuário */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="usuario" className="text-xs font-semibold text-sky-900 uppercase tracking-widest">
              Usuário
            </label>
            <div className="p-0.5 rounded-xl" style={{ background: 'linear-gradient(to right, #0c4a6e, #075985, #0369a1)' }}>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="seu@email.com"
                className="w-full px-4 py-2.5 rounded-[10px] bg-white text-slate-800 text-sm outline-none"
                value={usuarioLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className="text-xs font-semibold text-sky-900 uppercase tracking-widest">
              Senha
            </label>
            <div className="p-0.5 rounded-xl" style={{ background: 'linear-gradient(to right, #0c4a6e, #075985, #0369a1)' }}>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-[10px] bg-white text-slate-800 text-sm outline-none"
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex justify-center"
            style={{ background: 'linear-gradient(to right, #0c4a6e, #075985, #0369a1)' }}
          >
            {isLoading
              ? <ClipLoader color="#ffffff" size={20} />
              : <span>Entrar</span>
            }
          </button>

        </form>

        <div className="h-px bg-slate-200" />

        <p className="text-center text-sm text-slate-500">
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="text-sky-700 font-semibold hover:underline">
            Cadastre-se
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
