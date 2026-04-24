import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import FormContato from "../../components/formcontato/FormContato";


function Home() {

    const {usuario} = useContext(AuthContext);

    let acessoRapido;

    if(usuario.token !== ''){
      acessoRapido = (
        <>
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-2xl font-bold text-slate-950">Bem-vindo, {usuario.nome}!</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">

          <Link
            to="/apolices"
            className="rounded-2xl shadow-md shadow-black/80 overflow-hidden bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                alt="Apólices"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <span className="text-slate-100 font-bold uppercase tracking-widest text-lg">Apólices</span>
              <p className="text-slate-100 text-sm leading-relaxed">
                Confira todas as apólices vigentes, gerencie coberturas e acompanhe o status de cada contrato de forma rápida e centralizada.
              </p>
              <span className="text-slate-100 text-xs font-semibold uppercase tracking-widest mt-2 hover:underline">
                Ver apólices →
              </span>
            </div>
          </Link>

          <Link
            to="/clientes"
            className="rounded-2xl shadow-md shadow-black/80 overflow-hidden bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1686771416282-3888ddaf249b"
                alt="Clientes"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <span className="text-slate-100 font-bold uppercase tracking-widest text-lg">Clientes</span>
              <p className="text-slate-100 text-sm leading-relaxed">
                Confira uma lista de todos os clientes cadastrados, acesse seus dados de contato e veja as apólices vinculadas a cada um.
              </p>
              <span className="text-slate-100 text-xs font-semibold uppercase tracking-widest mt-2 hover:underline">
                Ver clientes →
              </span>
            </div>
          </Link>

        </div>
        </>
      )
    }

  return (
    <>
      <section className="bg-white flex flex-col items-center justify-center pt-8 bg-[url('https://images.unsplash.com/photo-1506836467174-27f1042aa48c')] bg-cover bg-center relative h-dvh">
        <div className="absolute inset-0 bg-sky-950/50">
        </div>
        <div className="z-10 flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center m-2">VivaCare</h1>
          <p className="text-2xl md:text-3xl font-medium leading-snug text-white text-center m-2">Mais que cuidado, uma parceria de vida</p>
          <a href="#formContato"
            className="bg-linear-to-r from-sky-950 via-sky-900 to-sky-800 text-white text-lg font-semibold px-8 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-lg shadow-none transition-all duration-300">
              Fale com um de nossos corretores
          </a>
        </div>
      </section>

      <div 
        className="min-h-screen flex flex-col items-center py-16 px-4"
        style={{
          backgroundImage: `
          repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 20px,
          rgba(186,230,255,0.25) 20px,
          rgba(186,230,255,0.25) 21px
          ),
          linear-gradient(to bottom right, #ffffff, #e0f2fe)
           `
  }}
      >


        {/* Fazer lógica para os cards só aparecerem quando estiver logado */}
        {acessoRapido}


        <div className="w-full max-w-5xl mt-12">
          <FormContato />
        </div>

      </div>
    </>
  )
}

export default Home
