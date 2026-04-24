import Popup from "reactjs-popup";
import FormCliente from "../formcliente/FormCliente";

function ModalCliente() {
  return (
    <Popup
      trigger={
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-sky-400/30 bg-sky-800/8 hover:bg-sky-800/15 hover:border-sky-400/60 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.15),0_0_0_1px_rgba(56,189,248,0.3)] transition-all duration-300 cursor-pointer h-full min-h-55">
          <span className="text-5xl text-sky-400/45 leading-none transition-all duration-300 hover:scale-115 hover:text-sky-400">
            +
          </span>
          <span className="text-sky-700/60 text-xs font-semibold uppercase tracking-widest">
            Novo Cliente
          </span>
        </div>
      }
      modal
      contentStyle={{
        borderRadius: '1rem',
        padding: '0',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        width: '560px'
      }}
      overlayStyle={{
        background: 'rgba(0,0,0,0.5)'
      }}
    >
      <FormCliente />
    </Popup>
  );
}

export default ModalCliente;
