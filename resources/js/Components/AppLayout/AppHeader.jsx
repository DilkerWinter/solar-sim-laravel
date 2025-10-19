import { Link, usePage } from "@inertiajs/react";
import DefaultBreadcrumb from "./DefaultBreadcrumb";
import { PanelLeft, User } from "lucide-react";

export default function AppHeader({
  isSidebarOpen,
  onToggleSidebar,
  breadcrumb
}) {
  const { auth } = usePage().props;
  const user = auth?.user;

    return (
        <header className="sticky top-0 z-50 bg-white">
            <div className="flex h-16 items-center gap-3 p-6">
                <button
                    onClick={onToggleSidebar}
                    className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-400 transition"
                    aria-label="Alternar menu lateral"
                >
                    <PanelLeft className="h-6 w-6" />
                </button>

        <div className="flex flex-col">
          {breadcrumb ? breadcrumb : <DefaultBreadcrumb/>}
        </div>

        <div className="flex-1" />

        <Link href="/profile" className="flex items-center space-x-2 group">
          <p className="text-gray-600 transition group-hover:text-black">
            {user
              ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
              : "Usuário"}
          </p>
          <span
            className="
              p-2 rounded-full
              bg-gradient-to-r from-green-600 to-blue-500
              transition
              group-hover:from-green-800 group-hover:to-blue-700
            "
            aria-label="Ícone do perfil do usuário"
          >
            <User className="h-5 w-5 text-white" />
          </span>
        </Link>
      </div>
    </header>
  );
}
