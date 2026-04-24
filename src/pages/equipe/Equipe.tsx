// Componente principal da página Equipe
function Equipe() {
    // Lista dos membros da equipe, cada um com nome, foto, link do portfólio, texto e posição da foto
    const membros = [
        { nome: "Daniel Nascimento", foto: "https://ik.imagekit.io/vjqejp2vh/integrantes/foto-daniel-nascimento.png?updatedAt=1776195525043", link: "https://dnasciment0.github.io/portfolio_tjs13/", texto: "SCRUM Master", posicaoFoto: "object-[70%_top]" },
        { nome: "Leonardo Ibanhez", foto: "https://ik.imagekit.io/vjqejp2vh/integrantes/foto-leonardo-ibanhez.jpg?updatedAt=1776195523970", link: "https://leoibanhez92.github.io/portfolio_tjs_13/", texto: "Desenvolvedor" },
        { nome: "Paula Alcantara", foto: "https://ik.imagekit.io/vjqejp2vh/integrantes/foto-paula-alcantara.jpg?updatedAt=1776195524895", link: "https://portfolio-generation-paula.netlify.app/", texto: "Desenvolvedora" },
        { nome: "Vivian Rodrigues", foto: "https://ik.imagekit.io/vjqejp2vh/integrantes/foto-vivian-rodrigues.png?updatedAt=1776195525935", link: "https://dashenio.github.io/portfolio/", texto: "Tester" },
        { nome: "Wallace Silva", foto: "https://ik.imagekit.io/vjqejp2vh/integrantes/foto-wallace.jpg?updatedAt=1776200225538", link: "https://portifoliowallaceespece.netlify.app/", texto: "Desenvolvedor" },
    ];

    // Função que renderiza cada card de membro
    const renderMembro = (membro: typeof membros[0], index: number) => (
                <div
                    key={index}
                    className="rounded-2xl shadow-md shadow-black/80 p-4 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-md bg-linear-to-r from-sky-950 via-sky-900 to-sky-800"
                >
            {/* Foto do membro em círculo */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                {membro.foto ? (
                    <img
                        src={membro.foto}
                        alt={membro.nome}
                        className={`w-full h-full object-cover ${"posicaoFoto" in membro ? membro.posicaoFoto : "object-top"}`}
                    />
                ) : (
                    <span className="text-teal-400 text-4xl">?</span>
                )}
            </div>

            {/* Informações do membro: nome, descrição e link do portfólio */}
            <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-lg font-semibold text-slate-100">
                    {membro.nome}
                </span>
                <p className="text-sm text-slate-100">
                    {membro.texto || "Descrição do membro"}
                </p>
                {/* Só mostra o link se existir */}
                {membro.link ? (
                    <a
                        href={membro.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-100 hover:underline font-bold"
                    >
                        Portfólio
                    </a>
                ) : null}
            </div>
        </div>
    );

    // Renderização principal da página
    return (
        <div
            className="flex flex-col items-center w-full"
        >
            {/* Título e logo */}
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
                <img src="/Logo AllCare Cores Escuras.png" alt="AllCare Escuro" className="h-10 sm:h-14" />
                <h1 className="text-3xl md:text-5xl font-bold text-slate-950">Equipe AllCare</h1>
            </div>

            {/* Grid responsivo dos cards dos membros */}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                {membros.map(renderMembro)}
            </div>
        </div>
    );
}

export default Equipe;