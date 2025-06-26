import React, { useState } from "react";

export default function SelectField({
    label,
    name,
    options,
    required = false,
    optional = false,
    value: controlledValue,
    onChange: onControlledChange,
}) {
    const [value, setValue] = useState(
        controlledValue !== undefined ? controlledValue : ""
    );

    React.useEffect(() => {
        if (controlledValue !== undefined) {
            setValue(controlledValue);
            if (onControlledChange) {
                onControlledChange({ target: { value: controlledValue } });
            }
        }
    }, [controlledValue]);

    function handleChange(e) {
        const newValue = e.target.value;
        setValue(newValue);
        if (onControlledChange) {
            onControlledChange(e);
        }
    }

    const commonProps = {
        id: name,
        name,
        value,
        onChange: handleChange,
        className: `mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`,
        required,
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium">
                {label} {required && <span className="text-red-500">*</span>}
                {!required && optional && (
                    <span className="text-gray-400 ml-1 text-xs">
                        (Opcional)
                    </span>
                )}
            </label>

            <select {...commonProps}>
                {!required && <option value="">Selecione uma opção</option>}

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
