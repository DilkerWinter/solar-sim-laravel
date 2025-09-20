import { UserPen } from "lucide-react";

export function DataTableResetPasswordButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full border border-gray-600 text-gray-600  hover:text-white hover:bg-gray-600 transition-colors"
      aria-label="Resetar Senha"
    >
      <UserPen size={16} />
    </button>
  );
}
