import { Sun } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                            <Sun className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold">SolarSim</span>
                    </div>
                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            Política de Privacidade
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            Termos de Uso
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            Suporte
                        </a>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 SolarSim. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
