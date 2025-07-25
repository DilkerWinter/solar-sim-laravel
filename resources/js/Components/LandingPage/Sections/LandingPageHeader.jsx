import { useState } from "react";
import { Menu, Route, Sun, X } from "lucide-react";
import ButtonGradient from "../UI/ButtonGradient";
import { router } from "@inertiajs/react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScrollTo = (id) => (e) => {
        e.preventDefault();
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setIsMobileMenuOpen(false);
        }
    };

    const links = [
        { label: "Dashboard", id: "second-section" },
        { label: "Funcionalidades", id: "third-section" },
        { label: "Benefícios", id: "fourth-section" },
        { label: "Contato", id: "fith-section" },
    ];

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 py-2 shadow-xl ">
            <div className="relative container mx-auto px-4 py-6 flex items-center justify-center">
                <div className="absolute left-4 flex items-center space-x-2 ">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                        <Sun className="h-6 w-6 text-white" />{" "}
                    </div>
                    <a
                        href="#first-section"
                        onClick={handleScrollTo("first-section")}
                        className="text-2xl m-2 font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                    >
                        SolarSim
                    </a>
                </div>

                <nav className="hidden md:flex space-x-8">
                    {links.map(({ label, id }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={handleScrollTo(id)}
                            className="duration-300 transform hover:scale-110 transition-all relative text-gray-600
                            hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600
                            after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
                            after:w-full after:scale-x-0 after:h-[2px] 
                            after:bg-gradient-to-r after:from-green-500 after:to-blue-600
                            after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                {/* Botões à direita */}
                <div className="absolute right-4 hidden md:flex space-x-4">
                    <ButtonGradient>Demonstração Gratuita</ButtonGradient>
                    <div className="bg-white/80 rounded-lg border-2 border-green-500 bg-clip-padding relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-green-500 before:to-blue-600 before:-z-10 transition-colors duration-200 group hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:border-transparent">
                        <button onClick={() => router.visit(route('login'))} className="relative px-4 py-2 rounded-lg shadow-inner shadow-black/2 text-transparent bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text transition-colors duration-200 group-hover:bg-transparent group-hover:text-white">
                            Login
                        </button>
                    </div>
                </div>

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
                        {links.map(({ label, id }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                onClick={handleScrollTo(id)}
                                className="text-gray-700 font-medium hover:text-green-600 transition"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                    <button className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl shadow max-w-xs w-full mx-auto">
                        Demonstração Gratuita
                    </button>
                    <button
                    onClick={() => router.visit('/login')} 
                    className="mt-2 border border-green-500 text-green-600 px-4 py-2 rounded-xl max-w-xs w-full mx-auto">
                        Login
                    </button>
                </div>
            )}
        </header>
    );
}
