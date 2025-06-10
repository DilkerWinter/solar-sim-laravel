import React, { useState } from "react";
import AddOptionalFormButton from "@/Components/Create/AddOptionalFormButton";
import BackButton from "@/Components/Create/BackButton";
import FormCard from "@/Components/Create/FormCard";
import InputField from "@/Components/Create/InputText";
import SubmitButton from "@/Components/Create/SubmitButton";
import { House, User, Zap } from "lucide-react";
import OptionalMultiSectionFormCard from "@/Components/Create/MultiSectionFormCard";

export default function Create() {
    const [addresses, setAddresses] = useState([]);
    const [removingIds, setRemovingIds] = useState([]);

    function addAddress() {
        setAddresses((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                fields: {},
                energyInfo: null,
            },
        ]);
    }

    function formatCep(val) {
        const numericValue = val.replace(/\D/g, "");
        if (numericValue.length > 5) {
            return numericValue.slice(0, 5) + "-" + numericValue.slice(5, 8);
        }
        return numericValue;
    }

    function formatPhone(val) {
        let digits = val.replace(/\D/g, "").slice(0, 11);

        if (digits.length === 0) {
            return "";
        } else if (digits.length <= 2) {
            return `(${digits}`;
        } else if (digits.length <= 6) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        } else {
            return `(${digits.slice(0, 2)}) ${digits.slice(
                2,
                7
            )}-${digits.slice(7)}`;
        }
    }

    function formatDocumentNumber(value) {
        const digits = value.replace(/\D/g, "").slice(0, 14);

        if (digits.length <= 11) {
            return digits
                .replace(/^(\d{3})(\d)/, "$1.$2")
                .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1-$2");
        } else {
            return digits
                .replace(/^(\d{2})(\d)/, "$1.$2")
                .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1/$2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        }
    }

    function addEnergyInfo(addressId) {
        setAddresses((prev) =>
            prev.map((addr) =>
                addr.id === addressId ? { ...addr, energyInfo: {} } : addr
            )
        );
    }

    function removeAddressCard(id) {
        setRemovingIds((prev) => [...prev, id]);

        setTimeout(() => {
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));
            setRemovingIds((prev) => prev.filter((remId) => remId !== id));
        }, 500);
    }

    function removeEnergyInfo(addressId) {
        setAddresses((prev) =>
            prev.map((addr) =>
                addr.id === addressId ? { ...addr, energyInfo: null } : addr
            )
        );
    }

    return (
        <div className="px-6 relative ">
            <div className="relative w-full max-w-5xl mx-auto pt-4">
                <BackButton />
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-center">
                        Cadastro de Cliente
                    </h1>
                </div>
            </div>

            <form className="w-full max-w-5xl mx-auto space-y-8">
                <FormCard
                    headerBgColor="bg-blue-100"
                    headerTextColor="text-blue-700"
                    IconComponent={User}
                    headerText="Informações do Cliente"
                >
                    <InputField
                        label="Nome"
                        name="name"
                        required
                        regex="^[A-Za-zÀ-ÿ\s'-]{3,}$"
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        required
                        regex="^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
                        placeholder="exemplo@dominio.com"
                    />
                    <InputField
                        label="Telefone"
                        name="phone"
                        required
                        regex="^(\+55)?[\s]?\(?(\d{2})?\)?[\s-]?(9?\d{4}[\s-]?\d{4})$"
                        placeholder="(67) 99999-9999"
                        formatFunction={formatPhone}
                    />
                    <InputField
                        label="CPF/CNPJ"
                        name="document_number"
                        required
                        regex="^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})$"
                        formatFunction={formatDocumentNumber}
                    />
                </FormCard>

                {addresses.map((address, idx) => {
                    const isRemoving = removingIds.includes(address.id);

                    const sections = [
                        {
                            headerBgColor: "bg-green-100",
                            headerTextColor: "text-green-700",
                            IconComponent: House,
                            headerText:
                                idx === 0 ? "Endereço" : `Endereço ${idx + 1}`,
                            children: (
                                <>
                                    <InputField
                                        label="Rua"
                                        name={`addresses[${idx}].street`}
                                        required
                                    />
                                    <InputField
                                        label="CEP"
                                        name={`addresses[${idx}].postal_code`}
                                        required
                                        regex="^\d{2}\d{3}[-]\d{3}$"
                                        placeholder={"00000-000"}
                                        formatFunction={formatCep}
                                    />
                                    <InputField
                                        label="Número"
                                        name={`addresses[${idx}].number`}
                                        required
                                    />
                                    <InputField
                                        label="Bairro"
                                        name={`addresses[${idx}].neighborhood`}
                                        required
                                    />
                                    <InputField
                                        label="Cidade"
                                        name={`addresses[${idx}].city`}
                                        required
                                    />
                                    <InputField
                                        label="Estado"
                                        name={`addresses[${idx}].state`}
                                        required
                                    />
                                </>
                            ),
                            isRemovable: false,
                        },
                    ];

                    if (address.energyInfo) {
                        sections.push({
                            headerBgColor: "bg-yellow-100",
                            headerTextColor: "text-yellow-700",
                            IconComponent: Zap,
                            headerText:
                                idx === 0
                                    ? "Informações de Energia Elétrica"
                                    : `Informações de Energia Elétrica ${
                                          idx + 1
                                      }`,
                            children: (
                                <>
                                    <InputField
                                        label="Consumo Médio Mensal (kWh)"
                                        name={`addresses[${idx}].energyInfo.average_monthly_consumption_kwh`}
                                        required
                                    />
                                    <InputField
                                        label="Consumo Médio Anual (kWh)"
                                        name={`addresses[${idx}].energyInfo.average_annual_consumption_kwh`}
                                        required
                                    />
                                    <InputField
                                        label="Conta de Energia Média (R$)"
                                        name={`addresses[${idx}].energyInfo.average_energy_bill`}
                                        required
                                    />
                                    <InputField
                                        label="Concessionária de Energia"
                                        name={`addresses[${idx}].energyInfo.energy_provider`}
                                        required
                                    />
                                    <InputField
                                        label="Tipo de Instalação"
                                        name={`addresses[${idx}].energyInfo.installation_type`}
                                        required
                                    />
                                    <InputField
                                        label="Tipo de Telhado"
                                        name={`addresses[${idx}].energyInfo.roof_type`}
                                        required
                                    />
                                    <InputField
                                        label="Observações"
                                        name={`addresses[${idx}].energyInfo.notes`}
                                        textarea
                                        optional
                                    />
                                </>
                            ),
                            isRemovable: true,
                        });
                    }

                    return (
                        <div
                            key={address.id}
                            className={`relative transition-opacity duration-500 ${
                                isRemoving ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            <OptionalMultiSectionFormCard
                                sections={sections}
                                onAdd={
                                    !address.energyInfo
                                        ? () => addEnergyInfo(address.id)
                                        : null
                                }
                                addText="Adicionar Informações de Energia Elétrica"
                                onRemoveSection={(idxSection) => {
                                    if (sections[idxSection]?.isRemovable) {
                                        removeEnergyInfo(address.id);
                                    }
                                }}
                                onRemoveCard={() =>
                                    removeAddressCard(address.id)
                                }
                                removeText="Remover Informações de Energia Elétrica"
                                removeCardText="Remover Endereço"
                            />
                        </div>
                    );
                })}

                <div className="flex justify-center mt-8">
                    <AddOptionalFormButton
                        onClick={addAddress}
                        text={"+ Adicionar Endereço"}
                    />
                </div>

                <div className="text-right">
                    <SubmitButton text="Cadastrar" />
                </div>
            </form>
        </div>
    );
}
