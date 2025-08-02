import { Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import EditableField from "../../../UI/EditableField";
import Field from "./TextField";

export default function EnergyInfoCard({
    customer,
    setCustomer,
    address,
    energyInfo,
    isEditing,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [editedEnergyInfo, setEditedEnergyInfo] = useState({ ...energyInfo });

    if (!energyInfo) return null;

    function handleEnergyInfoChange(field, value) {
        setEditedEnergyInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function formatMoney(value) {
        const digits = value.replace(/\D/g, "");
        const number = parseFloat(digits) / 100;
        return number.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    const resumo = `Consumo médio: ${formatMoney(
        editedEnergyInfo.average_monthly_consumption_kwh
    )} kWh/mês – R$ ${formatMoney(editedEnergyInfo.average_energy_bill)}`;

    function handleDelete() {
        const updatedAddresses = customer.addresses.map((a) =>
            a.id === address.id ? { ...a, address_energy_info: null } : a
        );

        setCustomer((prev) => ({
            ...prev,
            addresses: updatedAddresses,
        }));
    }

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

                <div className="flex items-center gap-2">
                    {isEditing && (
                        <button
                            aria-label="Excluir endereço"
                            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-2 px-3 rounded-full shadow transition-colors duration-300"
                            onClick={handleDelete}
                        >
                            Deletar
                        </button>
                    )}

                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="p-1 rounded hover:bg-gray-200 transition"
                        aria-label={
                            isOpen ? "Fechar endereço" : "Abrir endereço"
                        }
                    >
                        {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {!isOpen && <p className="mt-2 text-sm text-gray-700">{resumo}</p>}

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "max-h-[1000px] opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm">
                    {isEditing ? (
                        <>
                            <EditableField
                                label="Consumo Médio Mensal (kWh)"
                                name="average_monthly_consumption_kwh"
                                value={formatMoney(
                                    editedEnergyInfo.average_monthly_consumption_kwh
                                )}
                                onChange={(e) =>
                                    handleEnergyInfoChange(
                                        "average_monthly_consumption_kwh",
                                        formatMoney(e.target.value)
                                    )
                                }
                            />
                            <EditableField
                                label="Consumo Médio Anual (kWh)"
                                name="average_annual_consumption_kwh"
                                value={formatMoney(
                                    editedEnergyInfo.average_annual_consumption_kwh
                                )}
                                onChange={(e) =>
                                    handleEnergyInfoChange(
                                        "average_annual_consumption_kwh",
                                        formatMoney(e.target.value)
                                    )
                                }
                            />
                            <EditableField
                                label="Conta de Energia Média (R$)"
                                name="average_energy_bill"
                                value={formatMoney(
                                    editedEnergyInfo.average_energy_bill
                                )}
                                onChange={(e) =>
                                    handleEnergyInfoChange(
                                        "average_energy_bill",
                                        formatMoney(e.target.value)
                                    )
                                }
                            />
                            <EditableField
                                label="Concessionária de Energia"
                                name="energy_provider"
                                value={editedEnergyInfo.energy_provider}
                                onChange={(e) =>
                                    handleEnergyInfoChange(
                                        "energy_provider",
                                        e.target.value
                                    )
                                }
                            />
                            <EditableField
                                label="Observações"
                                name="notes"
                                value={editedEnergyInfo.notes || ""}
                                onChange={(e) =>
                                    handleEnergyInfoChange(
                                        "notes",
                                        e.target.value
                                    )
                                }
                                multiline
                            />
                        </>
                    ) : (
                        <>
                            <Field
                                label="Consumo Médio Mensal (kWh)"
                                value={`${formatMoney(
                                    energyInfo.average_monthly_consumption_kwh
                                )} kWh`}
                            />
                            <Field
                                label="Consumo Médio Anual (kWh)"
                                value={`${formatMoney(
                                    energyInfo.average_annual_consumption_kwh
                                )} kWh`}
                            />
                            <Field
                                label="Conta de Energia Média (R$)"
                                value={`R$ ${formatMoney(
                                    energyInfo.average_energy_bill
                                )}`}
                            />
                            <Field
                                label="Concessionária de Energia"
                                value={energyInfo.energy_provider}
                            />
                            {energyInfo.notes && (
                                <div className="sm:col-span-2">
                                    <Field
                                        label="Observações"
                                        value={energyInfo.notes}
                                        multiline
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
