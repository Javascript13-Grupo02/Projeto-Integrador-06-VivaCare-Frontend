import {
  type ChangeEvent,
  type SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type Usuario from "../../models/Usuario";
import { atualizar, buscar, cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";


function FormUsuario() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  // Controla a exibição do formulário
  const [formVisivel, setFormVisivel] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || "";

  const [usuarioForm, setUsuarioForm] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    roles: ""
  } as Usuario);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  async function buscarUsuarioPorId(id: string) {
    try {
      await buscar(`/usuarios/${id}`, setUsuarioForm, {
        headers: { Authorization: token },
      });
      // Se estiver editando, exibe o formulário direto
      setFormVisivel(true);
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao buscar o usuário.", "erro");
      }
    }
  }

  function registrarTipoUsuario(tipo: "cliente" | "corretor") {
    setUsuarioForm({
      ...usuarioForm,
      // @ts-ignore - Evita erros caso 'roles' não esteja na interface estática Usuario
      roles: tipo
    });
    setFormVisivel(true);
  }

  function cancelarSelecao() {
    setUsuarioForm({
      ...usuarioForm,
      // @ts-ignore
      roles: ""
    });
    setFormVisivel(false);
  }

  useEffect(() => {
    if (id !== undefined && token !== "") {
      buscarUsuarioPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioForm({
      ...usuarioForm,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    id !== undefined ? navigate("/usuarios") : navigate("/login");
  }

  async function gerarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuarioForm.usuario)) {
      ToastAlerta("Por favor, insira um endereço de e-mail válido.", "erro");
      return;
    }

    // Validação de senha
    if (usuarioForm.senha !== confirmarSenha) {
      ToastAlerta("As senhas não coincidem.", "erro");
      return;
    }

    if (usuarioForm.senha.length < 8) {
      ToastAlerta("A senha deve ter pelo menos 8 caracteres.", "erro");
      return;
    }

    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/usuarios`, usuarioForm, setUsuarioForm, {
          headers: { Authorization: token },
        });
        ToastAlerta("Usuário atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Usuário", "erro");
        }
      }
    } else {
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuarioForm, setUsuarioForm);
        ToastAlerta("Usuário cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Usuário", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (

    <div className="container flex flex-col columns-1 mx-auto items-center mt-10">

    {!formVisivel && (
      <div className="bg-white rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.3)] p-10 w-full max-w-sm flex flex-col gap-5 mx-4 dark:bg-slate-900">

        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-extrabold text-sky-900 dark:text-slate-100">VivaCare</h1>
          <p className="text-sm text-slate-500 dark:text-slate-100">Como deseja se cadastrar?</p>
        </div>

        <div className="h-px bg-slate-200" />

        <div className="flex flex-col gap-4">

          {/* Card Cliente */}
          <button
            type="button"
            onClick={() => registrarTipoUsuario("cliente")}
            className="w-full border-2 border-sky-900 rounded-xl text-left hover:bg-sky-50 transition-all duration-300 "
          >
            <div className="flex items-center gap-4 p-5">
              <div className="w-11 h-11 rounded-full bg-sky-100 flex items-center justify-center shrink-0 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-sky-900 dark:text-slate-100">Novo Cliente</p>
                <p className="text-xs text-sky-700 dark:text-slate-100">Quero consultar minhas apólices</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-sky-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </div>
          </button>

          {/* Card Corretor */}
          <button
            type="button"
            onClick={() => registrarTipoUsuario("corretor")}
            className="w-full rounded-xl text-left hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            style={{ background: 'linear-gradient(to right, #0c4a6e, #075985, #0369a1)' }}
          >
            <div className="flex items-center gap-4 p-5">
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white ">Novo Corretor</p>
                <p className="text-xs text-white/70">Quero gerenciar apólices</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </div>
          </button>

        </div>

        <div className="h-px bg-slate-200" />

        <p className="text-center text-sm text-slate-500 dark:text-slate-100">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-sky-700 font-semibold hover:underline">
            Entrar
          </Link>
        </p>

      </div>
    )}

    {formVisivel && (
      <>
      <h1 className="text-4xl text-center font-bold text-sky-800 my-8 dark:text-slate-100">
        {id !== undefined ? "Editar" : "Cadastrar"}{" "}
        {/* @ts-ignore */}
        {usuarioForm.roles === "corretor" ? "Corretor" : "Cliente"}
      </h1>
      <form
        className="flex flex-col w-full max-w-lg gap-4 bg-white p-8 rounded-2xl shadow-xl border border-slate-200 dark:bg-slate-900"
        onSubmit={gerarNovoUsuario}
      >
        {/* Input field 'roles' com a propriedade hidden */}
            <input
              type="hidden"
              name="roles"
              // @ts-ignore
              value={usuarioForm.roles || ""}
            />
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="font-semibold text-sky-900 dark:text-slate-100  ">
            Nome completo
          </label>
          <input
            type="text"
            placeholder="Seu nome completo"
            name="nome"
            required
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
            value={usuarioForm.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="usuario" className="font-semibold text-sky-900 dark:text-slate-100">
            E-mail
          </label>
          <input
            type="email"
            placeholder="email@exemplo.com"
            name="usuario"
            required
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
            value={usuarioForm.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="senha" className="font-semibold text-sky-900 dark:text-slate-100">
            Senha
          </label>
          <input
            type="password"
            placeholder="Mínimo 8 caracteres"
            name="senha"
            required
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
            value={usuarioForm.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmarSenha" className="font-semibold text-sky-900 dark:text-slate-100">
            Confirmar Senha
          </label>
          <input
            type="password"
            placeholder="Repita a senha"
            name="confirmarSenha"
            required
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
            value={confirmarSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmarSenha(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto" className="font-semibold text-sky-900 dark:text-slate-100">
            URL da Foto (Opcional)
          </label>
          <input
            type="text"
            placeholder="Link da imagem do usuário"
            name="foto"
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
            value={usuarioForm.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        {/* ADICIONADO: Div contendo os botões de ação do formulário dispostos lado a lado */}
            <div className="flex gap-4 mt-4 w-full">
              <button
                type="button"
                onClick={cancelarSelecao}
                className="w-1/3 rounded-xl border-2 border-slate-400 text-slate-700 font-bold py-3 hover:bg-slate-50 transition-colors dark:text-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-2/3 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold py-3 flex justify-center transition-colors dark:border-2 dark:border-slate-200 dark:text-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={24} />
                ) : (
                  <span>
                    {id === undefined ? "Cadastrar" : "Atualizar"}
                  </span>
                )}
              </button>
            </div>

            {id === undefined && (
              <p className="text-center text-sm text-slate-500 dark:text-slate-100">
                Já tem uma conta?{" "}
                <span
                  className="text-sky-700 hover:underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Entrar
                </span>
              </p>
        )}
      </form>
      
      </>
    )}
    </div>
  );
}

export default FormUsuario;
