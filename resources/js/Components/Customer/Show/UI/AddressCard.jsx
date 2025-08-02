import { ChevronDown, ChevronUp, Home, Trash } from "lucide-react";
import EnergyInfoCard from "./EnergyInfoCard";
import { useState } from "react";
import EditableField from "../../../UI/EditableField";
import EditableSelectField from "@/Components/UI/EditableSelectField";
import Field from "./TextField";

export default function AddressCard({
    customer,
    setCustomer,
    address,
    isEditing,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [editedAddress, setEditedAddress] = useState({ ...address });

    function handleAddressChange(field, value) {
        setEditedAddress((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    if (!address) return null;

    const resumoEndereco =
        address?.street && address?.number && address?.city && address?.state
            ? `${address.street}, ${address.number} - ${address.city}/${address.state}`
            : "Novo Endereço";

    function formatCep(val) {
        const numericValue = val.replace(/\D/g, "");
        if (numericValue.length > 5) {
            return numericValue.slice(0, 5) + "-" + numericValue.slice(5, 8);
        }
        return numericValue;
    }

    function handleDelete() {
        const updatedAddresses = customer.addresses.filter(
            (a) => a.id !== address.id
        );

        setCustomer((prev) => ({
            ...prev,
            addresses: updatedAddresses,
        }));
    }

    return (
        <div className="border-2 border-gray-300 rounded-2xl p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                    <Home className="w-5 h-5 text-gray-600" />
                    <h2 className="text-sm font-medium">{resumoEndereco}</h2>
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
                                required
                                label="Rua"
                                name="street"
                                value={editedAddress.street}
                                onChange={(e) =>
                                    handleAddressChange(
                                        "street",
                                        e.target.value
                                    )
                                }
                            />
                            <EditableField
                                required
                                label="CEP"
                                name="cep"
                                value={editedAddress.cep}
                                onChange={(e) =>
                                    handleAddressChange(
                                        "cep",
                                        formatCep(e.target.value)
                                    )
                                }
                            />
                            <EditableField
                                required
                                label="Número"
                                name="number"
                                value={editedAddress.number}
                                onChange={(e) =>
                                    handleAddressChange(
                                        "number",
                                        e.target.value
                                    )
                                }
                            />
                            <EditableField
                                required
                                label="Bairro"
                                name="neighborhood"
                                value={editedAddress.neighborhood}
                                onChange={(e) =>
                                    handleAddressChange(
                                        "neighborhood",
                                        e.target.value
                                    )
                                }
                            />
                            <EditableField
                                required
                                label="Cidade"
                                name="city"
                                value={editedAddress.city}
                                onChange={(e) =>
                                    handleAddressChange("city", e.target.value)
                                }
                            />
                            <EditableField
                                required
                                label="Estado"
                                name="state"
                                value={editedAddress.state}
                                onChange={(e) =>
                                    handleAddressChange("state", e.target.value)
                                }
                            />
                            <EditableSelectField
                                required
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
                                    {
                                        label: "Comercial",
                                        value: "comercial",
                                    },
                                    {
                                        label: "Industrial",
                                        value: "industrial",
                                    },
                                    {
                                        label: "Rural",
                                        value: "rural",
                                    },
                                ]}
                            />
                            <EditableField
                                required
                                label="Tipo de Telhado"
                                name="roof_type"
                                value={editedAddress.roof_type}
                                onChange={(e) =>
                                    handleAddressChange(
                                        "roof_type",
                                        e.target.value
                                    )
                                }
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
                    <EnergyInfoCard
                        customer={customer}
                        setCustomer={setCustomer}
                        address={address}
                        energyInfo={address.address_energy_info}
                        isEditing={isEditing}
                    />
                </div>
            </div>
        </div>
    );
}
