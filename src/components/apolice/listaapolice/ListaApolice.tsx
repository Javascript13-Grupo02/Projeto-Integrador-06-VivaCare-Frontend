import { useContext, useEffect, useState } from "react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import type Apolice from "../../../models/Apolice";
import { SyncLoader } from "react-spinners";
import CardApolice from "../cardapolice/CardApolice";
import ModalApolice from "../modalapolice/ModalApolice";

function ListaApolices() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [apolices, setApolices] = useState<Apolice[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarPostagens();
  }, [apolices.length]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);

      await buscar("/apolices", setApolices, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
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
          {!isLoading && apolices.length === 0 && (
            <span className="text-3xl text-center my-8  text-sky-900">
              Nenhuma Apolice foi encontrada!
            </span>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-6 items-stretch"
          >
            {apolices.map((apolice) => (
              <CardApolice key={apolice.id} apolice={apolice} />
            ))}
            <ModalApolice />
          </div>
        </div>
      </div>
    </>
  );
}
export default ListaApolices;
