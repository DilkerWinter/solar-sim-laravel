import ButtonGradient from "@/Components/LandingPage/ButtonGradient";
import Header from "@/Components/LandingPage/Header";
import Title from "@/Components/LandingPage/Title";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-600 to-blue-500">
            <Header />
            <section className="py-20 px-4">
                <div className="container mx-auto text-center bg-white/80 shadow-2xl shadow-black/20 rounded-3xl p-4">
                    {/* Badge */}
                    <span className="shadow-md inline-block mb-6 bg-gradient-to-r text-white px-4 py-1 rounded-full font-semibold hover:bg-green-200 transition cursor-default select-none">
                        🚀 Sistema Completo de Propostas Solares
                    </span>
                    <Title> Solar Sim </Title>

                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        O software definitivo para empresas de energia solar.{" "}
                        <span className="font-semibold text-green-600">
                            Gere propostas personalizadas
                        </span>
                        , gerencie clientes, produtos e monte kits solares de
                        forma inteligente.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <ButtonGradient className="shadow-md shadow-black/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                </div>
            </section>

            <section className="py-8 px-4 bg-transparent">
                <div className="max-w-4xl mx-auto">
                    <img
                        src="https://placehold.co/800x300/000000/FFFFFF?text=SolarSim+Dashboard&font=roboto"
                        alt="SolarSim Dashboard Preview"
                        className="w-full rounded-lg shadow-lg"
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                </div>
            </section>
        </div>
    );
}
