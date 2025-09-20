import { Trash2 } from "lucide-react";

export function DataTableDeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full border border-red-600 text-red-600  hover:text-white hover:bg-red-600 transition-colors"
      aria-label="Deletar"
    >
      <Trash2 size={20} />
    </button>
  );
}
