import Popup from "reactjs-popup";
import FormCliente from "../formcliente/FormCliente";

function ModalCliente() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
            Novo Cliente
          </button>
        }
        modal
        contentStyle={{
          borderRadius: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <FormCliente />
      </Popup>
    </>
  );
}

export default ModalCliente;
