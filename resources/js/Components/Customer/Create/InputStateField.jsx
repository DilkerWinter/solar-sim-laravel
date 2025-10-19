import React, { useState } from "react";

const brazilianStates = [
    { abbreviation: "AC", name: "Acre" },
    { abbreviation: "AL", name: "Alagoas" },
    { abbreviation: "AP", name: "Amapá" },
    { abbreviation: "AM", name: "Amazonas" },
    { abbreviation: "BA", name: "Bahia" },
    { abbreviation: "CE", name: "Ceará" },
    { abbreviation: "DF", name: "Distrito Federal" },
    { abbreviation: "ES", name: "Espírito Santo" },
    { abbreviation: "GO", name: "Goiás" },
    { abbreviation: "MA", name: "Maranhão" },
    { abbreviation: "MT", name: "Mato Grosso" },
    { abbreviation: "MS", name: "Mato Grosso do Sul" },
    { abbreviation: "MG", name: "Minas Gerais" },
    { abbreviation: "PA", name: "Pará" },
    { abbreviation: "PB", name: "Paraíba" },
    { abbreviation: "PR", name: "Paraná" },
    { abbreviation: "PE", name: "Pernambuco" },
    { abbreviation: "PI", name: "Piauí" },
    { abbreviation: "RJ", name: "Rio de Janeiro" },
    { abbreviation: "RN", name: "Rio Grande do Norte" },
    { abbreviation: "RS", name: "Rio Grande do Sul" },
    { abbreviation: "RO", name: "Rondônia" },
    { abbreviation: "RR", name: "Roraima" },
    { abbreviation: "SC", name: "Santa Catarina" },
    { abbreviation: "SP", name: "São Paulo" },
    { abbreviation: "SE", name: "Sergipe" },
    { abbreviation: "TO", name: "Tocantins" },
];

export default function InputStateField({
    name,
    value,
    onChange,
    required = true,
}) {
    const [errorMessage, setErrorMessage] = useState("");

    const handleBlur = () => {
        if (required && !value) {
            setErrorMessage("Este campo é obrigatório.");
        } else {
            setErrorMessage("");
        }
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium">
                Estado {required && <span className="text-red-500">*</span>}
            </label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={(e) => {
                    setErrorMessage("");
                    onChange(e);
                }}
                onBlur={handleBlur}
                required={required}
                className={`flex-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errorMessage ? "border-red-500" : "border-gray-300"
                }`}
            >
                <option value="">Selecione...</option>
                {brazilianStates.map(({ abbreviation, name }) => (
                    <option key={abbreviation} value={abbreviation}>
                        {name}
                    </option>
                ))}
            </select>
            {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
            )}
        </div>
    );
}
