import { Link } from "react-router-dom"
import FormContato from "../../components/form/Form"


function Home() {
  return (
    <>
      <section className="bg-white flex flex-col items-center justify-center pt-8 bg-[url('https://images.unsplash.com/photo-1506836467174-27f1042aa48c')] bg-cover bg-center relative h-dvh">
        <div className="absolute inset-0 bg-sky-950/50">
        </div>
        <div className="z-10 flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center m-2">VivaCare</h1>
          <p className="text-2xl md:text-3xl font-medium leading-snug text-white text-center m-2">Mais que cuidado, uma parceria de vida</p>
          <Link
            to="/apolices"
            className="bg-sky-800 hover:bg-sky-700 text-white text-lg font-semibold px-8 py-3 rounded-full transition-colors duration-300"
          >
            Conheça nossas apólices
          </Link>
        </div>
      </section>

      <div className="min-h-screen flex flex-col items-center py-16 px-4 bg-linear-to-br from-white to-sky-200">

        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-950">Acesso Rápido</h2>
        </div>

        {/* Fazer lógica para os cards só aparecerem quando estiver logado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">

          <Link
            to="/apolices"
            className="rounded-2xl shadow-md shadow-black/80 overflow-hidden bg-sky-800 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300"
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
            className="rounded-2xl shadow-md shadow-black/80 overflow-hidden bg-sky-800 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300"
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

        <div className="w-full max-w-5xl mt-12">
          <FormContato />
        </div>

      </div>
    </>
  )
}

export default Home
