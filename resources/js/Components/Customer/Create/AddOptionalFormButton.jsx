export default function AddOptionalFormButton({ text, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                px-6 py-2 
                bg-blue-200 text-blue-700
                font-semibold rounded-3xl 
                shadow-sm
                border-2 border-blue-500
                hover:bg-blue-200 hover:text-blue-700 
                transition duration-300 ease-in-out
                hover:border-blue-600 
                hover:shadow-md
                transform hover:scale-105
                tracking-wide
                cursor-pointer
            "
        >
            {text}
        </button>
    );
}
