import Popup from "reactjs-popup"
import FormApolice from "../formapolice/FormApolice"


function ModalApolice() {
  return (
    <>
    <Popup
        trigger={
            <button
                className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
                    Nova Apólice
            </button>
        }
        modal
        contentStyle={{
            borderRadius: '1rem',
            paddingBottom: '2rem'
        }}
    >
        <FormApolice/>
    </Popup>
    </>
  )
}

export default ModalApolice