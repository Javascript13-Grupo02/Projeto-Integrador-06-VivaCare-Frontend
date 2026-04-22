function Sobre() {
  return (
    <div className="bg-linear-to-br from-white to-sky-200 w-full py-12 px-4 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-7xl mx-auto space-y-16"></div>
        <div className="text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold  text-slate-950">
            VivaCare
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold  text-slate-950">
            Mais que cuidado, uma parceria de vida
          </h2>
          <p className="text-2xl font-medium leading-snug text-slate-950">
            Segurança hoje e a tranquilidade que sua família merece para o
            futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch w-full">
          <div className="flex flex-col items-center w-full h-full">
            <img
              src="https://ik.imagekit.io/vjqejp2vh/VivaCare/VivaCare%20Escura.png"
              alt="Logo VivaCare"
              className="w-64 md:w-80 h-auto drop-shadow-lg mb-8"
            />

            <div className="bg-sky-800 p-10 md:p-14 rounded-3xl shadow-md shadow-black/80 text-center w-full mt-auto">
              <h3 className="text-3xl font-bold mb-6 text-slate-100">
                Nossa Missão
              </h3>
              <p className="text-lg leading-relaxed text-slate-100 ">
                A VivaCare é mais do que um seguro de vida - é proteção, cuidado
                e tranquilidade para você e sua família em todos os momentos.
                Com soluções confiáveis e acessíveis, garantimos segurança hoje
                e mais confiança no futuro.
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full h-full">
            <div className="bg-sky-800  p-10 md:p-14 rounded-3xl shadow-md shadow-black/80 mt-auto">
              <h3 className="text-3xl font-bold mb-6  text-slate-100  text-center">
                Funcionalidades do Projeto
              </h3>

              <p className="text-lg leading-relaxed mb-8 text-center text-slate-100">
                O sistema foi desenhado para oferecer uma experiência
                inteligente e segura tanto na gestão quanto na consulta de
                produtos:
              </p>

              <div className="space-y- text-left">
                <div>
                  <h4 className="text-xl font-bold mb-3  text-slate-100 ">
                    Gestão e Buscas
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-100">
                    <li>
                      <strong>Gerenciamento de Clientes:</strong> Cadastro,
                      Cadastro, listagem, atualização e exclusão de clientes.
                    </li>
                    <li>
                      <strong> Busca Avançada:</strong> Além das opções padrão
                      (pesquisar por id, pesquisar por nome, listar todos)
                      também são permitidas buscas mais específicas como busca
                      por e-mail cadastrado e busca por planos de em uma faixa
                      de preço específica.
                    </li>
                    <li>
                      <strong>
                        Relacionamento entre Usuário/Cliente e Apólice:{" "}
                      </strong>
                      Garante que quando pesquisamos por um usuário (corretor)
                      ou por um cliente sejam retornadas na pesquisa também as
                      apólices associadas.
                    </li>
                  </ul>
                </div>

                <div className="mt-10">
                  <h4 className="text-xl font-bold mb-3  text-slate-100 ">
                    Inteligência e Segurança
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-100">
                    <li>
                      <strong>Filtro de Segurança:</strong> O sistema verifica a
                      idade do usuário em tempo real e bloqueia o registro para
                      menores de 18 anos, garantindo conformidade com as
                      políticas de seguro de vida.
                    </li>

                    <li>
                      <strong> Autenticação: </strong>Implementação de login e
                      proteção de rotas, garantindo que apenas usuários
                      autenticados acessem os recursos da API.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sobre;
