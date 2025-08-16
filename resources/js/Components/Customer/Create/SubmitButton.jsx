export default function SubmitButton({ text, onClick }) {
    return (
        <button
            type="submit"
            onClick={onClick}
            className="bg-green-600 text-white px-6 py-2 rounded-2xl hover:bg-green-700 hover:scale-105 text-xl m-12"
        >
            {text}
        </button>
    );
}
