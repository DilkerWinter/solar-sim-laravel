import { Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function EnergyInfoCard({ energyInfo }) {
    if (!energyInfo) return null;

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    return (
        <div className="bg-white space-y-6 mt-6">
            <hr className="border-t border-gray-200" />

            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleOpen}
            >
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-yellow-100 text-yellow-700">
                    <Zap className="w-5 h-5" />
                    <h2 className="font-semibold text-lg select-none">
                        Informações de Energia Elétrica
                    </h2>
                </div>
                <button
                    aria-label={
                        isOpen
                            ? "Fechar informações de energia"
                            : "Abrir informações de energia"
                    }
                    className="p-2 rounded-full hover:bg-yellow-200 transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleOpen();
                    }}
                >
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-yellow-700" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-yellow-700" />
                    )}
                </button>
            </div>

            {!isOpen && (
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700">
                    <div className="flex items-center gap-2">
                        <p className="text-sm">
                            Consumo médio:{" "}
                            {energyInfo.average_monthly_consumption_kwh} kWh/mês
                            – R$ {energyInfo.average_energy_bill}
                        </p>
                    </div>
                </div>
            )}

            <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mt-4">
                    <div>
                        <p className="text-sm text-gray-500">
                            Consumo Médio Mensal (kWh)
                        </p>
                        <p className="font-semibold">
                            {energyInfo.average_monthly_consumption_kwh} kWh
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            Consumo Médio Anual (kWh)
                        </p>
                        <p className="font-semibold">
                            {energyInfo.average_annual_consumption_kwh} kWh
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            Conta de Energia Média (R$)
                        </p>
                        <p className="font-semibold">
                            R$ {energyInfo.average_energy_bill}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            Concessionária de Energia
                        </p>
                        <p className="font-semibold">
                            {energyInfo.energy_provider}
                        </p>
                    </div>
                    {energyInfo.notes && (
                        <div className="sm:col-span-2">
                            <p className="text-sm text-gray-500">Observações</p>
                            <p className="font-semibold whitespace-pre-wrap">
                                {energyInfo.notes}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
