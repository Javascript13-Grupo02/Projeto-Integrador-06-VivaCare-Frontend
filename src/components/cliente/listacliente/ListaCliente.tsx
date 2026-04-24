import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { SyncLoader } from "react-spinners";
import type Cliente from "../../../models/Cliente";
import CardCliente from "../cardcliente/CardCliente";
import ModalCliente from "../modalcliente/ModalCliente";

function ListaClientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Segurança: se não tiver token, volta para o login
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    }
  }, [token]);

  // Busca os clientes assim que a tela carrega
  useEffect(() => {
    buscarClientes();
  }, []);

  async function buscarClientes() {
    if (token === "") return;

    try {
      setIsLoading(true);
      await buscar("/clientes", setClientes, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#075985" size={25} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && clientes.length === 0 && (
            <span className="text-2xl text-center my-8 text-sky-900">
              Nenhum cliente encontrado no sistema VivaCare.
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {clientes.map((cliente) => (
              <CardCliente key={cliente.id} cliente={cliente} />
            ))}
            <ModalCliente />
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaClientes;
