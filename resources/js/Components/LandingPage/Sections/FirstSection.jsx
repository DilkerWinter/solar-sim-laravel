import Title from "@/Components/LandingPage/UI/Title";
import ButtonGradient from "@/Components/LandingPage/UI/ButtonGradient";

/**
 * First section of the landing page.
 *
 * @returns {JSX.Element} A JSX element representing the first section.
 */
export default function FirstSection() {
    return (
        <section className="py-32 px-6">
            <div className="container mx-auto text-center bg-white/90 shadow-xl shadow-black/10 rounded-3xl p-8 md:p-12 transition-all duration-300">
                <span className="inline-block mb-6 text-sm md:text-base bg-gradient-to-r from-green-600 to-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg shadow-black/10 select-none cursor-default">
                    🚀 Sistema Completo de Propostas Solares
                </span>

                <Title>Solar Sim</Title>

                <p className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 italic">
                    Simplifique seu processo de vendas com tecnologia
                    inteligente e suporte completo.
                </p>

                <p className="text-lg md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                    O software definitivo para empresas de energia solar.
                    <br />
                    <span className="font-semibold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
                        Gere propostas personalizadas
                    </span>
                    , gerencie clientes, produtos e monte kits solares de forma
                    inteligente.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                    <ButtonGradient className="px-8 py-4 text-lg md:text-xl font-bold shadow-lg shadow-black/20 hover:scale-105 transition-transform duration-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        Começar Agora
                    </ButtonGradient>
                </div>

                <p className="mt-6 text-gray-500 text-sm max-w-md mx-auto">
                    Sem necessidade de cadastro para testar. Experimente grátis
                    por 7 dias!
                </p>
            </div>
        </section>
    );
}
