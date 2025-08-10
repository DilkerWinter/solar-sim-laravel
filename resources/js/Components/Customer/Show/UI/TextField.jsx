export default function Field({ label, value, capitalize = false }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`font-medium ${capitalize ? "capitalize" : ""}`}>
                {value}
            </p>
        </div>
    );
}