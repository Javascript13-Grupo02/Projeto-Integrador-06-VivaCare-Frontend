import { GithubLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react"

function Footer() {

    const data = new Date().getFullYear()

    return (
        <div className="flex justify-center bg-sky-800 text-white">
            <div className="container flex items-center justify-between py-4 px-6">

                {/* Copyright */}
                <p className="text-base md:text-xl font-bold">
                    VivaCare | Copyright: {data}
                </p>

                {/* Redes Sociais */}
                <div className="flex flex-col items-center gap-1">
                    <p className="text-lg text-center">Acesse nossas redes sociais</p>
                    <div className="flex gap-4 items-center">

                        <a href="https://www.instagram.com/_allcare/" target="_blank" rel="noopener noreferrer" className="hover:text-[#45a8f0] transition-colors">
                            <InstagramLogoIcon weight='bold' className="w-6 h-6 sm:w-8 sm:h-8" />
                        </a>

                        {/* Linktree */}
                        <a href="https://linktr.ee/allcare_org" target="_blank" rel="noopener noreferrer" className="hover:text-[#45a8f0] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                                <path d="M136,160v72a8,8,0,0,1-16,0V160a8,8,0,0,1,16,0Zm72-64H147.31l42.35-42.34a8,8,0,0,0-11.32-11.32L136,84.69V24a8,8,0,0,0-16,0V84.69L77.66,42.34A8,8,0,0,0,66.34,53.66L108.69,96H48a8,8,0,0,0,0,16h60.69L66.34,154.34a8,8,0,0,0,11.32,11.32L128,115.31l50.34,50.35a8,8,0,0,0,11.32-11.32L147.31,112H208a8,8,0,0,0,0-16Z"/>
                            </svg>
                        </a>

                        <a href="https://github.com/Javascript13-Grupo02/Projeto-Integrador-06-VivaCare-Frontend" target="_blank" rel="noopener noreferrer" className="hover:text-[#45a8f0] transition-colors">
                            <GithubLogoIcon weight='bold' className="w-6 h-6 sm:w-8 sm:h-8" />
                        </a>

                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row gap-4 text-sm">
                    <a href="#" className="hover:text-[#45a8f0] transition-colors">Termos</a>
                    <a href="#" className="hover:text-[#45a8f0] transition-colors">Privacidade</a>
                    <a href="#" className="hover:text-[#45a8f0] transition-colors">Acessibilidade</a>
                </div>

            </div>
        </div>
    )
}

export default Footer