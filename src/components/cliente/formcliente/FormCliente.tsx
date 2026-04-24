import {
  type ChangeEvent,
  type SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Cliente from "../../../models/Cliente";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { podeCadastrar } from "../../../utils/ChecagemIdade";

function FormCliente() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token || "";

  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    data_nascimento: "",
    foto: "",
  } as Cliente);

  async function buscarClientePorId(id: string) {
    try {
      await buscar(`/clientes/${id}`, setCliente, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarClientePorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/clientes");
  }

  async function gerarNovoCliente(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cliente.email)) {
      ToastAlerta("Por favor, insira um endereço de e-mail válido.", "erro");
      return;
    }

    const telefoneRegex = /^\+55\d{11}$/;
    if (!telefoneRegex.test(cliente.telefone)) {
      ToastAlerta(
        "Telefone inválido! Use o formato : +55 seguido do DDD e do número (Ex: +5521999999999).",
        "erro",
      );
      return;
    }

    if (!podeCadastrar(cliente)) {
      ToastAlerta(
        "O cliente precisa ter pelo menos 18 anos para ser cadastrado.",
        "erro",
      );
      return;
    }
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/clientes`, cliente, setCliente, {
          headers: { Authorization: token },
        });
        ToastAlerta("Cliente atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Cliente", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/clientes`, cliente, setCliente, {
          headers: { Authorization: token },
        });
        ToastAlerta("Cliente cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Cliente", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const inputClass = "border-2 border-slate-300 rounded-xl p-2 focus:outline-none focus:border-sky-800 w-full";

  const formContent = (
    <>
      <h1 className="text-4xl text-center font-bold text-sky-800 my-8">
        {id !== undefined ? "Editar Cliente" : "Cadastrar Cliente"}
      </h1>

      <form
        className="flex flex-col w-full max-w-lg gap-4 bg-white p-8 rounded-2xl shadow-xl border border-sky-200 mx-auto"
        onSubmit={gerarNovoCliente}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="font-semibold text-sky-900">Nome do Cliente</label>
          <input type="text" placeholder="Nome completo" name="nome" required
            className={inputClass} value={cliente.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-sky-900">E-mail</label>
          <input type="email" placeholder="email@exemplo.com" name="email" required
            className={inputClass} value={cliente.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="telefone" className="font-semibold text-sky-900">Telefone</label>
          <input type="text" placeholder="+5521999999999" name="telefone" required
            className={inputClass} value={cliente.telefone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="data_nascimento" className="font-semibold text-sky-900">Data de Nascimento</label>
          <input type="date" name="data_nascimento" required
            className={inputClass}
            value={cliente.data_nascimento ? cliente.data_nascimento.split("T")[0] : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto" className="font-semibold text-sky-900">URL da Foto (Opcional)</label>
          <input type="text" placeholder="Link da imagem do cliente" name="foto"
            className={inputClass} value={cliente.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <button type="submit"
          className="rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold w-full py-3 mt-4 flex justify-center transition-colors">
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar Cliente" : "Atualizar Cliente"}</span>
          )}
        </button>
      </form>
    </>
  );

  // Página solo (edição)
  if (id !== undefined) {
    return (
      <div className="min-h-screen flex flex-col items-center py-16 px-4 w-full">
        {formContent}
      </div>
    );
  }

  // Modal (cadastro)
  return (
    <div className="flex flex-col items-center px-4 py-4 w-full">
      {formContent}
    </div>
  );
}

export default FormCliente;
