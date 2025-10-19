export default function RedirectButton({ children, onClick, type = "button" }) {
  return (
    <button
      onClick={onClick}
      className="
      bg-green-500
      hover:bg-green-600
        flex items-center gap-2 px-4 py-2
        text-white text-lg font-semibold
        shadow-md
        rounded-2xl
        hover:scale-105 transition-all duration-300 ease-in-out
      "
    >
      {children}
    </button>
  );
}
