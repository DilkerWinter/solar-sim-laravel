export default function PageNavigator({ currentPage, totalPages, onPageChange }) {
  if (totalPages === 0) return null;

  const maxButtons = 7;
  let startPage = Math.max(1, currentPage - 3);
  let endPage = Math.min(totalPages, currentPage + 3);

  if (endPage - startPage + 1 < maxButtons) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxButtons - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Pagination" className="flex justify-center space-x-2 mt-6 select-none">
      {/* Botões de navegação principais */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`
          px-3 py-1 rounded-md font-semibold transition
          ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }
        `}
        aria-label="Primeira página"
      >
        {"<<"}
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-3 py-1 rounded-md font-semibold transition
          ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }
        `}
        aria-label="Página anterior"
      >
        {"<"}
      </button>

      {/* Botões das páginas */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`
            px-3 py-1 rounded-md text-sm font-semibold transition
            ${
              currentPage === page
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-100"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Botões de navegação próximos */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-3 py-1 rounded-md font-semibold transition
          ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }
        `}
        aria-label="Próxima página"
      >
        {">"}
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`
          px-3 py-1 rounded-md font-semibold transition
          ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }
        `}
        aria-label="Última página"
      >
        {">>"}
      </button>
    </nav>
  );
}
