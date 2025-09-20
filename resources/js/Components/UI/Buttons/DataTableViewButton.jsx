import { Eye } from "lucide-react";

export function DataTableViewButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full text-gray-600  hover:text-white hover:bg-gray-600 transition-colors"
      aria-label="Deletar"
    >
      <Eye size={16} />
    </button>
  );
}
