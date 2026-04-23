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

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || "";

  const [usuarioForm, setUsuarioForm] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  } as Usuario);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  async function buscarUsuarioPorId(id: string) {
    try {
      await buscar(`/usuarios/${id}`, setUsuarioForm, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
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
    <div className="container flex flex-col mx-auto items-center mt-10">
      <h1 className="text-4xl text-center font-bold text-sky-800 my-8">
        {id !== undefined ? "Editar Usuário" : "Cadastrar Usuário"}
      </h1>

      <form
        className="flex flex-col w-full max-w-lg gap-4 bg-white p-8 rounded-2xl shadow-xl border border-sky-200"
        onSubmit={gerarNovoUsuario}
      >
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

        <button
          type="submit"
          className="rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold w-full py-3 mt-4 flex justify-center transition-colors"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>
              {id === undefined ? "Cadastrar Usuário" : "Atualizar Usuário"}
            </span>
          )}
        </button>

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
    </div>
  );
}

export default FormUsuario;
