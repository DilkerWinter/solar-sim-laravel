import { Search, X } from "lucide-react";

export default function ProductSearchBar({ search, onSearchChange, onClear }) {
  return (
    <div className="relative w-full md:w-2/5 ">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

      <input

        type="text"
        placeholder="Buscar..."
        className="w-full pl-10 pr-10 py-2 border rounded-2xl shadow-md focus:outline-none "
        value={search}
        onChange={onSearchChange}
      />

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
