import { Link, usePage } from "@inertiajs/react";
import {
    BarChart3,
    FileText,
    Home,
    Package,
    Settings,
    Sun,
    Users,
} from "lucide-react";

/**
 * Controls the side bar content here
 */
const itensMenu = [
    { title: "Painel", url: "/dashboard", icon: Home },
    { title: "Clientes", url: "/customers", icon: Users },
    { title: "Produtos", url: "/produtos", icon: Package },
    { title: "Kits Solares", url: "/kits", icon: Sun },
    { title: "Propostas", url: "/propostas", icon: FileText },
    { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
];

/**
 * SideBar for the App Layout
 * @returns React Component
 */
export default function SideBar() {
    const { auth } = usePage().props;
    const { url } = usePage();
    const firstSegment = url.split("/")[1];

    const isAdmin = auth?.is_admin;

    const itensSistemaAdmin = isAdmin
        ? [
              {
                  title: "Funcionarios",
                  url: "/configuracoes",
                  icon: Settings,
              },
          ]
        : [];

    return (
        <nav className="w-60 flex flex-col h-screen p-4 bg-white">
            <div className="flex items-center mb-8">
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-md flex items-center justify-center mr-2">
                    <Sun size={16} color="#fff" />
                </div>
                <div>
                    <div className="font-bold text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        SolarSim
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div className="font-bold text-sm text-gray-700 mb-2">
                    Menu Principal
                </div>
                <ul className="list-none p-0 m-0 space-y-3">
                    {itensMenu.map(({ title, url: itemUrl, icon: Icon }) => {
                        const itemSegment = itemUrl.split("/")[1];
                        const isCurrentPage = itemSegment == firstSegment;

                        return (
                            <li key={title}>
                                <Link
                                    href={itemUrl}
                                    className="flex items-center gap-2 transition-colors group"
                                    as="a"
                                >
                                    <Icon
                                        size={16}
                                        className={
                                            isCurrentPage
                                                ? "text-blue-500 group-hover:text-green-500 transition-colors"
                                                : "text-gray-800 group-hover:text-blue-600"
                                        }
                                    />
                                    <span
                                        className={
                                            isCurrentPage
                                                ? "bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
                                                : "text-gray-800 hover:text-blue-600"
                                        }
                                    >
                                        {title}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <hr className="border-t border-gray-200 mb-4" />

            {isAdmin && (
                <div className="mb-auto">
                    <div className="font-bold text-sm text-gray-700 mb-2">
                        Menu Administrador
                    </div>
                    <ul className="list-none p-0 m-0 space-y-3">
                        {itensSistemaAdmin.map(({ title, url, icon: Icon }) => (
                            <li key={title}>
                                <Link
                                    href={url}
                                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
                                    as="a"
                                >
                                    <Icon size={16} />
                                    <span>{title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-auto">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white border-none py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors">
                    <FileText size={16} />
                    Nova Proposta
                </button>
            </div>
        </nav>
    );
}
