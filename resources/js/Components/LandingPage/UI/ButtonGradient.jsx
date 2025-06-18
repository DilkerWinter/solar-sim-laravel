export default function ButtonGradient({ children, className , onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-x-2 bg-gradient-to-r from-green-500 to-blue-500 
        hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow transition
        ${className || ''}
      `}
    >
      {children}
    </button>
  );
}
