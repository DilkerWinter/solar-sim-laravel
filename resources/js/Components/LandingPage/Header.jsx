import { useState } from "react";
import { Menu, X } from "lucide-react";
import ButtonGradient from "./ButtonGradient";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
<div className="relative container mx-auto px-4 py-4 flex items-center justify-center my-2">
    {/* Logo à esquerda */}
    <div className="absolute left-4 flex items-center space-x-2">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg" />
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            SolarSim
        </a>
    </div>

    {/* Navbar centralizada */}
    <nav className="hidden md:flex space-x-8">
        {["Funcionalidades", "Benefícios", "Contato"].map((item) => (
            <a
                key={item}
                href="#"
                className="duration-300 transform hover:scale-110 transition-all relative text-gray-600
                hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600
                after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
                after:w-full after:scale-x-0 after:h-[2px] 
                after:bg-gradient-to-r after:from-green-500 after:to-blue-600
                after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
                {item}
            </a>
        ))}
    </nav>

    {/* Botões à direita */}
    <div className="absolute right-4 hidden md:flex space-x-4">
        <ButtonGradient>Demonstração Gratuita</ButtonGradient>
        <div className="bg-white/80 rounded-lg border-2 border-green-500 bg-clip-padding relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-green-500 before:to-blue-600 before:-z-10 transition-colors duration-200 group hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:border-transparent">
            <button className="relative px-4 py-2 rounded-lg shadow-inner shadow-black/2 text-transparent bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text transition-colors duration-200 group-hover:bg-transparent group-hover:text-white">
                Login
            </button>
        </div>
    </div>

    {/* Botão mobile */}
    <button
        className="md:hidden absolute right-4 text-gray-600"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
</div>


            {isMobileMenuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col space-y-4">
                    <nav className="flex flex-col space-y-2 items-center">
                        {["Funcionalidades", "Benefícios", "Contato"].map(
                            (item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-gray-700 font-medium hover:text-green-600 transition"
                                >
                                    {item}
                                </a>
                            )
                        )}
                    </nav>
                    <button className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl shadow max-w-xs w-full mx-auto">
                        Demonstração Gratuita
                    </button>
                    <button className="mt-2 border border-green-500 text-green-600 px-4 py-2 rounded-xl max-w-xs w-full mx-auto">
                        Login
                    </button>
                </div>
            )}
        </header>
    );
}
