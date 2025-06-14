export default function CreateRedirectButton({ children, onClick, type = "button" }) {
  return (
    <button
      onClick={onClick}
      className="
      bg-green-500
      hover:bg-green-600
        transition-colors duration-300
        flex items-center gap-2 px-4 py-2
        text-white text-lg font-semibold
        shadow-md
        rounded-2xl
        hover:scale-105
      "
    >
      {children}
    </button>
  );
}
