import { useState, useEffect } from "react";

export default function InputField({
    label,
    name,
    type = "text",
    textarea = false,
    regex,
    required = false,
    placeholder,
    optional = false,
    formatFunction,
    value: controlledValue,
    onChange,
    onCepBlur,
    prefix,
    suffix,
}) {
    const [error, setError] = useState("");

    function validate(val) {
        if (required && !val.trim()) {
            return "Este campo é obrigatório.";
        }
        if (regex) {
            const pattern = new RegExp(regex);
            if (val && !pattern.test(val)) {
                return "Formato inválido.";
            }
        }
        return "";
    }

    function handleChange(e) {
        let val = e.target.value;
        if (formatFunction) {
            val = formatFunction(val);
        }

        const syntheticEvent = {
            target: {
                name: name,
                value: val,
            },
        };
        onChange(syntheticEvent);

        if (error) {
            const validationError = validate(val);
            setError(validationError);
        }
    }

    async function handleBlur() {
        const validationError = validate(controlledValue);
        setError(validationError);

        if (name.includes("postal_code") && onCepBlur) {
            await onCepBlur(controlledValue);
        }
    }

    const commonProps = {
        id: name,
        name,
        value: controlledValue,
        onChange: handleChange,
        onBlur: handleBlur,
        placeholder: placeholder || "",
        className: `flex-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            // Adjusted for flex
            error ? "border-red-500" : "border-gray-300"
        }`,
        required,
    };

    return (
        <div className={textarea ? "md:col-span-2" : ""}>
            <label htmlFor={name} className="block text-sm font-medium">
                {label} {required && <span className="text-red-500">*</span>}
                {!required && optional && (
                    <span className="text-gray-400 ml-1 text-xs">
                        (Opcional)
                    </span>
                )}
            </label>

            <div className="mt-1 flex rounded-md shadow-sm">
                {prefix && (
                    <span className="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-100 text-sm">
                        {prefix}
                    </span>
                )}
                {textarea ? (
                    <textarea
                        {...commonProps}
                        className={`${commonProps.className} ${
                            prefix ? "rounded-l-none" : ""
                        } ${suffix ? "rounded-r-none" : ""}`}
                        rows={4}
                    ></textarea>
                ) : (
                    <input
                        type={type}
                        {...commonProps}
                        className={`${commonProps.className} ${
                            prefix ? "rounded-l-none" : ""
                        } ${suffix ? "rounded-r-none" : ""}`}
                    />
                )}
                {suffix && (
                    <span className="inline-flex items-center px-3 rounded-r-md border border-gray-300 bg-gray-100 text-sm">
                        {suffix}
                    </span>
                )}
            </div>

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
