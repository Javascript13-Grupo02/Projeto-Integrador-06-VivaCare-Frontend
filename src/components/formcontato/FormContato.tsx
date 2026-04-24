import { AtIcon, CheckCircleIcon, EnvelopeSimpleIcon, UserIcon } from "@phosphor-icons/react"
import { useState, type SyntheticEvent } from "react";


function FormContato() {

    const [enviado, setEnviado] = useState<boolean>(false);

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // chave de acesso ligada ao email do grupo
        formData.append("access_key", "dfcc3470-3019-4c65-a640-81488071f89f");

        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
        });

        const data = await response.json();

        setEnviado(data.success ? true : false);
    }


  return (

    // Conteiner externo
    <div className="flex items-center justify-center pb-4">

        <div className="flex flex-col justify-center rounded-2xl bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 text-slate-200
                                w-240 min-h-150 my-4 mx-4 px-8 py-8 shadow-2xl transition-all" id="formContato">
                
            {!enviado ? (
                    /* ESTADO 1: FORMULÁRIO */
                    <form onSubmit={handleSubmit}
                        className="flex flex-col columns-1 justify-start gap-4 mt-3 mb-8 mx-8 w-full">

                    <h1 className="font-bold text-3xl mt-8 mb-12">
                        Entre em contato
                    </h1>

                    {/* div de nome */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-row items-center gap-0.5"> 
                            <UserIcon size={20} color="#E2E8F0" weight="bold"  />
                            <label htmlFor="nome" className="font-bold">Nome</label>
                        </div>
                        <input type="text"
                                placeholder="Digite o seu nome"
                                id="nome"
                                name="nome"
                                required
                                className="border-2 rounded-xl py-2 px-4 w-6/10 bg-white  text-slate-200 focus:outline-none" />
                    </div>

                    {/* div de email */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-row items-end gap-0.5">
                            <AtIcon size={20} color="#E2E8F0" weight="bold" />
                            <label htmlFor="email" className="font-bold">E-mail</label>
                            
                        </div>
                        <input type="email"
                                placeholder="example@example.com"
                                id="email"
                                name="email"
                                required
                                className="border-2 rounded-xl py-2 px-4 w-7/10 bg-white text-slate-200 focus:outline-none"/>
                    </div>

                    {/* div de mensagem */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-row items-end gap-0.5">
                            <EnvelopeSimpleIcon size={20} color="#E2E8F0" weight="bold" />
                            <label htmlFor="mensagem" className="font-bold">Mensagem</label>
                            
                        </div>
                        <textarea
                                placeholder="Digite uma mensagem de até 500 caracteres"
                                id="mensagem"
                                name="mensagem"
                                required
                                className="border-2 border-slate-200 rounded-xl py-2.5 px-4 w-9/10 bg-white text-slate-800 resize-none focus:outline-none"
                                        rows={5}/>
                        
                        <button type="submit"
                                id="submit"
                                name="submit"
                                className="flex justify-center items-center leading-1.5 mt-2.5 w-9/10 p-4
                                    rounded-lg  text-slate-800 font-bold text-md bg-sky-200 
                                    hover:bg-sky-600 hover:text-slate-200 inset-1 transition-all duration-300"
                                >Enviar
                        </button>
                    </div>
                </form>
                ) : (
                        /* ESTADO 2: MENSAGEM ENVIADA */

                        <div className="flex flex-col items-center justify-center text-center gap-4 h-full animate-fade-in">
                            <CheckCircleIcon size={80} color="#00598a" weight="fill"/>
                            <h2 className="text-3xl font-bold text-sky-800">Mensagem Enviada!</h2>
                            <p className="text-slate-800">
                                Obrigado pelo contato. <br /> Retornaremos em breve.
                            </p>
                            <button 
                                onClick={() => setEnviado(false)}
                                className="mt-6 text-sm underline text-sky-600 hover:text-sky-950 ">
                                Enviar outra mensagem
                            </button>
                        </div>
                    )}
                </div>
    </div>

   
  )
  
}

export default FormContato