import { Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function EnergyInfoCard({ energyInfo }) {
    const [isOpen, setIsOpen] = useState(false);
    if (!energyInfo) return null;

    const resumo =
        `Consumo médio: ${energyInfo.average_monthly_consumption_kwh} kWh/mês – R$ ${energyInfo.average_energy_bill}`;

    return (
        <div>
            <hr className="border-t-2 border-gray-300 my-4 rounded-full" />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                    <Zap className="w-5 h-5 text-gray-600" />
                    <h2 className="text-sm font-medium">
                        Informações de Energia Elétrica
                    </h2>
                </div>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="p-1 rounded hover:bg-gray-200 transition"
                    aria-label={isOpen ? "Fechar informações de energia" : "Abrir informações de energia"}
                >
                    {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                </button>
            </div>

            {!isOpen && (
                <p className="mt-2 text-sm text-gray-700">
                    {resumo}
                </p>
            )}

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm">
                    <Field label="Consumo Médio Mensal (kWh)" value={`${energyInfo.average_monthly_consumption_kwh} kWh`} />
                    <Field label="Consumo Médio Anual (kWh)" value={`${energyInfo.average_annual_consumption_kwh} kWh`} />
                    <Field label="Conta de Energia Média (R$)" value={`R$ ${energyInfo.average_energy_bill}`} />
                    <Field label="Concessionária de Energia" value={energyInfo.energy_provider} />
                    {energyInfo.notes && (
                        <div className="sm:col-span-2">
                            <Field label="Observações" value={energyInfo.notes} multiline />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Field({ label, value, multiline = false }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`font-medium ${multiline ? "whitespace-pre-wrap" : ""}`}>
                {value}
            </p>
        </div>
    );
}
