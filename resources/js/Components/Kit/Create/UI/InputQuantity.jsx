import { useState } from "react";

export default function QuantityInput({
    name = "quantity",
    value = "",
    onChange,
    placeholder = "0",
    min = 0,
    step = 1,
}) {
    const [error, setError] = useState("");

    function validate(val) {
        const numValue = parseFloat(val);
        if (val && (isNaN(numValue) || numValue < 0)) {
            return "Digite apenas números positivos.";
        }
        return "";
    }

    function handleChange(e) {
        let val = e.target.value;

        val = val.replace(/[^0-9.,]/g, "");
        val = val.replace(",", ".");

        const parts = val.split(".");
        if (parts.length > 2) {
            val = parts[0] + "." + parts.slice(1).join("");
        }

        const syntheticEvent = {
            target: {
                name,
                value: val,
            },
        };

        onChange(syntheticEvent);

        const validationError = validate(val);
        setError(validationError);
    }

    function handleBlur() {
        const validationError = validate(value);
        setError(validationError);
    }

    return (
        <div className="w-16">
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`w-full px-2 py-1 border rounded-lg text-center text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
                min={min}
                step={step}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
