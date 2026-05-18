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

  // Garante que o usuario tem uma das roles de privilégio
  const temPrivilegio = ['admin', 'corretor'].includes(usuario.roles);

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token !== "") {
      buscarApolices();
    }
  }, [token]);

  async function buscarApolices() {
    try {
      setIsLoading(true);
      
      if (temPrivilegio) {
        // Busca todas as apólices (Admin / Corretor)
        await buscar("/apolices", setApolices, {
          headers: { Authorization: token },
        });
      } else {
        // Busca apólices pelo email do Cliente conectado
        // Certifique-se que no backend a rota seja: /apolices/email/:email
        await buscar(`/apolices/${usuario.usuario}`, setApolices, {
          headers: { Authorization: token },
        });
      }
    
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao carregar as apólices.", "erro");
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
        <div className="container flex flex-col px-4"> 
          
          {!isLoading && apolices.length === 0 && (
            <span className="text-3xl text-center my-8 text-sky-900">
              Nenhuma Apólice foi encontrada!
            </span>
          )}

          {/* Grid responsivo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {apolices.map((apolice) => (
              <CardApolice key={apolice.id} apolice={apolice} />
            ))}
            
            {/* O botão/modal de criar apólice só aparece para Admin/Corretor */}
            {temPrivilegio && <ModalApolice />}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaApolices;