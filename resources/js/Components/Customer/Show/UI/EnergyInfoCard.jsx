import { Zap, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";
import EditableField from "../../../UI/Inputs/EditableField";
import TextField from "../../../UI/Fields/TextField";
import { formatDecimal } from "@/Utils/formatNumber";

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
        const updatedInfo = {
            ...editedEnergyInfo,
            [field]: value,
        };
    
        setEditedEnergyInfo(updatedInfo);
    
        const updatedAddresses = customer.addresses.map((a) =>
            a.id === address.id
                ? { ...a, energy_info: updatedInfo }
                : a
        );
    
        setCustomer((prev) => ({
            ...prev,
            addresses: updatedAddresses,
        }));
    }

    const resumo =
        editedEnergyInfo?.average_annual_consumption_kwh != null &&
        editedEnergyInfo?.average_energy_bill != null
            ? `Consumo médio: ${formatDecimal(
                  (editedEnergyInfo.average_annual_consumption_kwh / 12).toFixed(0)
              )} kWh/mês – R$ ${formatDecimal(
                  editedEnergyInfo.average_energy_bill
              )}`
            : "Nova Informação de Energia";

    function handleDelete() {
        const updatedAddresses = customer.addresses.map((a) =>
            a.id === address.id ? { ...a, energy_info: null } : a
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
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-2 py-2 rounded-2xl text-sm font-medium transition-all duration-200 shadow-sm text-red-600  hover:text-red-700 hover:bg-gray-300"
                        >
                            <Trash2 size={22}/>
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
                                label="Consumo Médio Anual (kWh)"
                                name="average_annual_consumption_kwh"
                                value={formatDecimal(
                                    editedEnergyInfo.average_annual_consumption_kwh ?? ""
                                )}
                                onChange={(e) =>
                                    handleEnergyInfoChange(
                                        "average_annual_consumption_kwh",
                                        formatDecimal(e.target.value)
                                    )
                                }
                            />
                            <EditableField
                                label="Conta de Energia Média (R$)"
                                name="average_energy_bill"
                                value={formatDecimal(
                                    editedEnergyInfo.average_energy_bill ?? ""
                                )}
                                onChange={(e) =>
                                    handleEnergyInfoChange(
                                        "average_energy_bill",
                                        formatDecimal(e.target.value)
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
                            <TextField
                                label="Consumo Médio Anual (kWh)"
                                value={`${formatDecimal(
                                    energyInfo.average_annual_consumption_kwh
                                )} kWh`}
                            />
                            <TextField
                                label="Conta de Energia Média (R$)"
                                value={`R$ ${formatDecimal(
                                    energyInfo.average_energy_bill
                                )}`}
                            />
                            <TextField
                                label="Concessionária de Energia"
                                value={energyInfo.energy_provider}
                            />
                            {energyInfo.notes && (
                                <div className="sm:col-span-2">
                                    <TextField
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
