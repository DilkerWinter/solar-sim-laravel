import { Search, X } from "lucide-react";

export default function CustomerSearchBar({ search, onSearchChange, onClear }) {
  return (
    <div className="relative w-full md:w-2/5 ">
      {/* Ícone de busca à esquerda */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

      {/* Campo de input com padding para os ícones */}
      <input

        type="text"
        placeholder="Buscar por nome, email ou documento..."
        className="w-full pl-10 pr-10 py-2 border rounded-2xl shadow-md focus:outline-none "
        value={search}
        onChange={onSearchChange}
      />

      {/* Botão de limpar à direita */}
      {search && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
