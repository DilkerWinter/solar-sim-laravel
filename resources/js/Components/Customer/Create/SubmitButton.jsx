export default function SubmitButton({ text, onClick, onSubmit }) {
    return (
        <button
            type="submit"
            onClick={onClick}
            onSubmit={onSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-2xl hover:bg-green-700  text-xl "
        >
            {text}
        </button>
    );
}
