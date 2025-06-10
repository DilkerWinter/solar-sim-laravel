export default function SubmitButton({ text }) {
    return (
        <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-2xl hover:bg-blue-700 hover:scale-105 text-xl m-12"
        >
            {text}
        </button>
    );
}
