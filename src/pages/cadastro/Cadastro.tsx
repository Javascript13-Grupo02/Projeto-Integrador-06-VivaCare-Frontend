import {
  type ChangeEvent,
  type SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        ToastAlerta("Erro ao cadastrar o Usuário", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (

    <div className="container flex flex-col columns-1 mx-auto items-center mt-10">

      {!formVisivel && (
      <div className="flex flex-col gap-4 w-full max-w-lg">
        {/* Botão Clientes*/}
        <button
          type="button" // 
          onClick={() => registrarTipoUsuario("cliente")}
          className="w-full py-3 rounded-xl border-2 border-sky-800 text-sky-900 font-bold text-sm hover:-translate-y-0.5 hover:bg-sky-50 transition-all duration-300 flex justify-center items-center"
        >
          Novo Cliente
        </button>

        {/* Botão Corretores*/}
        <button
          type="button"
          onClick={() => registrarTipoUsuario("corretor")}
          className="w-full py-3 rounded-xl text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex justify-center items-center"
          style={{ background: 'linear-gradient(to right, #0c4a6e, #075985, #0369a1)' }}
        >
            <span>Novo Corretor</span>
          
        </button>
    </div>
    
      )}

    {formVisivel && (
      <>
      <h1 className="text-4xl text-center font-bold text-sky-800 my-8">
        {id !== undefined ? "Editar" : "Cadastrar"}{" "}
        {/* @ts-ignore */}
        {usuarioForm.roles === "corretor" ? "Corretor" : "Cliente"}
      </h1>
      <form
        className="flex flex-col w-full max-w-lg gap-4 bg-white p-8 rounded-2xl shadow-xl border border-sky-200"
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
          <label htmlFor="nome" className="font-semibold text-sky-900">
            Nome completo
          </label>
          <input
            type="text"
            placeholder="Seu nome completo"
            name="nome"
            required
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800"
            value={usuarioForm.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="usuario" className="font-semibold text-sky-900">
            E-mail
          </label>
          <input
            type="email"
            placeholder="email@exemplo.com"
            name="usuario"
            required
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800"
            value={usuarioForm.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="senha" className="font-semibold text-sky-900">
            Senha
          </label>
          <input
            type="password"
            placeholder="Mínimo 8 caracteres"
            name="senha"
            required
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800"
            value={usuarioForm.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmarSenha" className="font-semibold text-sky-900">
            Confirmar Senha
          </label>
          <input
            type="password"
            placeholder="Repita a senha"
            name="confirmarSenha"
            required
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800"
            value={confirmarSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmarSenha(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto" className="font-semibold text-sky-900">
            URL da Foto (Opcional)
          </label>
          <input
            type="text"
            placeholder="Link da imagem do usuário"
            name="foto"
            className="border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800"
            value={usuarioForm.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        {/* ADICIONADO: Div contendo os botões de ação do formulário dispostos lado a lado */}
            <div className="flex gap-4 mt-4 w-full">
              <button
                type="button"
                onClick={cancelarSelecao}
                className="w-1/3 rounded-xl border-2 border-slate-400 text-slate-700 font-bold py-3 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-2/3 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold py-3 flex justify-center transition-colors"
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
              <p className="text-center text-sm text-slate-500">
                Já tem uma conta?{" "}
                <span
                  className="text-sky-800 hover:underline cursor-pointer"
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
