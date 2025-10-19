import { Pen } from "lucide-react";

export function DataTableEditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full border border-blue-600 text-blue-600  hover:text-white hover:bg-blue-600 transition-colors"
      aria-label="Editar"
    >
      <Pen size={16} />
    </button>
  );
}
