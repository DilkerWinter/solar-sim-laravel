import { ChevronDown, ChevronUp, Home } from "lucide-react";
import EnergyInfoCard from "./EnergyInfoCard";
import { useState } from "react";
import EditableField from "../../../UI/EditableField";
import EditableSelectField from "@/Components/UI/EditableSelectField";

export default function AddressCard({ address, isEditing }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editedAddress, setEditedAddress] = useState({ ...address });

    function handleAddressChange(field, value) {
        setEditedAddress((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    if (!address) return null;

    const resumoEndereco = `${address.street}, ${address.number} - ${address.city}/${address.state}`;

    return (
        <div className="border-2 border-gray-300 rounded-2xl p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                    <Home className="w-5 h-5 text-gray-600" />
                    <h2 className="text-sm font-medium">{resumoEndereco}</h2>
                </div>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="p-1 rounded hover:bg-gray-200 transition"
                    aria-label={isOpen ? "Fechar endereço" : "Abrir endereço"}
                >
                    {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                </button>
            </div>

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
                                label="Rua"
                                defaultValue={editedAddress.street}
                            />
                            <EditableField
                                label="CEP"
                                defaultValue={editedAddress.cep}
                            />
                            <EditableField
                                label="Número"
                                defaultValue={editedAddress.number}
                            />
                            <EditableField
                                label="Bairro"
                                defaultValue={editedAddress.neighborhood}
                            />
                            <EditableField
                                label="Cidade"
                                defaultValue={editedAddress.city}
                            />
                            <EditableField
                                label="Estado"
                                defaultValue={editedAddress.state}
                            />
                            <EditableSelectField
                                label="Natureza do imóvel"
                                name="type"
                                value={editedAddress.type}
                                onChange={(e) =>
                                    handleAddressChange("type", e.target.value)
                                }
                                options={[
                                    {
                                        label: "Residencial",
                                        value: "residencial",
                                    },
                                    { label: "Comercial", value: "comercial" },
                                    {
                                        label: "Industrial",
                                        value: "industrial",
                                    },
                                    { label: "Rural", value: "rural" },
                                ]}
                            />

                            <EditableField
                                label="Tipo de Telhado"
                                defaultValue={editedAddress.roof_type}
                            />
                        </>
                    ) : (
                        <>
                            <Field label="Rua" value={address.street} />
                            <Field label="CEP" value={address.cep} />
                            <Field label="Número" value={address.number} />
                            <Field
                                label="Bairro"
                                value={address.neighborhood}
                            />
                            <Field label="Cidade" value={address.city} />
                            <Field label="Estado" value={address.state} />
                            <Field
                                label="Natureza do imóvel"
                                value={address.type}
                                capitalize
                            />
                            <Field
                                label="Tipo de Telhado"
                                value={address.roof_type}
                            />
                        </>
                    )}
                </div>

                <div className="mt-4">
                    <EnergyInfoCard energyInfo={address.address_energy_info} />
                </div>
            </div>
        </div>
    );
}

function Field({ label, value, capitalize = false }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`font-medium ${capitalize ? "capitalize" : ""}`}>
                {value}
            </p>
        </div>
    );
}
