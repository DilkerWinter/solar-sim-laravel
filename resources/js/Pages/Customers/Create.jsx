import React, { useRef, useState } from "react";
import AddOptionalFormButton from "@/Components/Customer/Create/AddOptionalFormButton";
import BackButton from "@/Components/Customer/Create/BackButton";
import FormCard from "@/Components/Customer/Create/FormCard";
import InputField from "@/Components/Customer/Create/InputText";
import SubmitButton from "@/Components/Customer/Create/SubmitButton";
import { House, User, Zap } from "lucide-react";
import OptionalMultiSectionFormCard from "@/Components/Customer/Create/MultiSectionFormCard";
import SelectField from "@/Components/Customer/Create/SelectInput";
import { v4 as uuidv4 } from "uuid";
import { Inertia } from "@inertiajs/inertia";
import ConfirmModal from "@/Components/ConfirmModal";
import InputStateField from "@/Components/Customer/Create/InputStateField";
import AppLayout from "@/Layouts/AppLayout";
import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";

export default function Create() {
    const [clientInfo, setClientInfo] = useState({
        name: "",
        email: "",
        phone: "",
        document_number: "",
    });
    const [addresses, setAddresses] = useState([]);
    const [removingIds, setRemovingIds] = useState([]);
    const [confirmRemoveAdressId, setConfirmRemoveAdressId] = useState();
    const [confirmRemoveEnergyInfoId, setConfirmRemoveEnergyInfoId] =
        useState();
    const [confirmSubmitForm, setConfirmSubmitForm] = useState();
    const formRef = useRef(null);

    function handleClientInfoChange(e) {
        const { name, value } = e.target;
        setClientInfo((prev) => ({ ...prev, [name]: value }));
    }

    function handleAddressFieldChange(addressId, fieldName, value) {
        setAddresses((prev) =>
            prev.map((addr) => {
                if (addr.id === addressId) {
                    const updatedAddr = { ...addr };

                    if (fieldName.startsWith("energyInfo.")) {
                        const energyFieldName = fieldName.split(".")[1];
                        updatedAddr.energyInfo = {
                            ...updatedAddr.energyInfo,
                            [energyFieldName]: value,
                        };
                    } else {
                        updatedAddr.fields = {
                            ...updatedAddr.fields,
                            [fieldName]: value,
                        };
                    }
                    return updatedAddr;
                }
                return addr;
            })
        );
    }

    async function handleCepBlur(addressId, cep) {
        const cleanCep = cep.replace(/\D/g, "");

        if (cleanCep.length !== 8) {
            return;
        }

        try {
            const response = await fetch(
                `https://viacep.com.br/ws/${cleanCep}/json/`
            );
            const data = await response.json();

            if (!data.erro) {
                setAddresses((prev) =>
                    prev.map((addr) =>
                        addr.id === addressId
                            ? {
                                  ...addr,
                                  fields: {
                                      ...addr.fields,
                                      postal_code: cep,
                                      street: data.logradouro || "",
                                      neighborhood: data.bairro || "",
                                      city: data.localidade || "",
                                      state: data.uf || "",
                                  },
                              }
                            : addr
                    )
                );
            } else {
                console.error("CEP not found.");
            }
        } catch (error) {
            console.error("Error to get CEP:", error);
        }
    }

    const formatDecimalNumber = (value) => {
        let formattedValue = value.replace(/[^0-9,]/g, "");

        const parts = formattedValue.split(",");
        if (parts.length > 2) {
            formattedValue = parts[0] + "," + parts.slice(1).join("");
        }

        if (parts[1] && parts[1].length > 2) {
            formattedValue = parts[0] + "," + parts[1].substring(0, 2);
        }

        return formattedValue;
    };

    function addAddress() {
        setAddresses((prev) => [
            ...prev,
            {
                id: uuidv4(),
                fields: {
                    street: "",
                    postal_code: "",
                    number: "",
                    neighborhood: "",
                    city: "",
                    state: "",
                },
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
        }, 400);
    }

    function removeEnergyInfo(addressId) {
        setAddresses((prev) =>
            prev.map((addr) =>
                addr.id === addressId ? { ...addr, energyInfo: null } : addr
            )
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name: clientInfo.name,
            email: clientInfo.email,
            phone: clientInfo.phone,
            document_number: clientInfo.document_number,
            addresses: addresses.map((address) => {
                const newAddress = { ...address.fields };

                if (address.energyInfo) {
                    newAddress.energy_info = { ...address.energyInfo };
                }

                if (newAddress.postal_code) {
                    newAddress.cep = newAddress.postal_code;
                    delete newAddress.postal_code;
                }

                return newAddress;
            }),
        };
        console.log(data);
        Inertia.post("/customers", data);
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

            <form
                className="w-full max-w-5xl mx-auto space-y-8"
                ref={formRef}
                onSubmit={handleSubmit}
            >
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
                        value={clientInfo.name}
                        onChange={handleClientInfoChange}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        required
                        regex="^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
                        placeholder="exemplo@dominio.com"
                        value={clientInfo.email}
                        onChange={handleClientInfoChange}
                    />
                    <InputField
                        label="Telefone"
                        name="phone"
                        required
                        regex="^(\+55)?[\s]?\(?(\d{2})?\)?[\s-]?(9?\d{4}[\s-]?\d{4})$"
                        placeholder="(67) 99999-9999"
                        formatFunction={formatPhone}
                        value={clientInfo.phone}
                        onChange={handleClientInfoChange}
                    />
                    <InputField
                        label="CPF/CNPJ"
                        name="document_number"
                        required
                        regex="^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})$"
                        placeholder="000.000.000-00"
                        formatFunction={formatDocumentNumber}
                        value={clientInfo.document_number}
                        onChange={handleClientInfoChange}
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
                                        value={address.fields.street}
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "street",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputField
                                        label="CEP"
                                        name={`addresses[${idx}].postal_code`}
                                        required
                                        regex="^\d{5}-\d{3}$"
                                        placeholder={"00000-000"}
                                        formatFunction={formatCep}
                                        value={address.fields.postal_code}
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "postal_code",
                                                e.target.value
                                            )
                                        }
                                        onCepBlur={(cep) =>
                                            handleCepBlur(address.id, cep)
                                        }
                                    />
                                    <InputField
                                        label="Número"
                                        name={`addresses[${idx}].number`}
                                        required
                                        value={address.fields.number}
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "number",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputField
                                        label="Bairro"
                                        name={`addresses[${idx}].neighborhood`}
                                        required
                                        value={address.fields.neighborhood}
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "neighborhood",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputField
                                        label="Cidade"
                                        name={`addresses[${idx}].city`}
                                        required
                                        value={address.fields.city}
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "city",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputStateField
                                        name={`addresses[${idx}].state`}
                                        value={address.fields.state}
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "state",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <SelectField
                                        label="Natureza do imóvel"
                                        name={`addresses[${idx}].type`}
                                        options={[
                                            {
                                                value: "residencial",
                                                label: "Residencial",
                                            },
                                            {
                                                value: "rural",
                                                label: "Rural",
                                            },
                                            {
                                                value: "comercial",
                                                label: "Comercial",
                                            },
                                            {
                                                value: "industrial",
                                                label: "Industrial",
                                            },
                                        ]}
                                        value={
                                            addresses[idx].fields.type ||
                                            "residencial"
                                        }
                                        required
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "type",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <SelectField
                                        label="Tipo de Telhado"
                                        name={`addresses[${idx}].roof_type`}
                                        options={[
                                            {
                                                value: "ceramica",
                                                label: "Telha Cerâmica (Colonial/Barro)",
                                            },
                                            {
                                                value: "concreto",
                                                label: "Telha de Concreto",
                                            },
                                            {
                                                value: "metalica",
                                                label: "Telha Metálica (Galvanizada)",
                                            },
                                            {
                                                value: "fibrocimento",
                                                label: "Telha de Fibrocimento (Eternit)",
                                            },
                                            {
                                                value: "laje",
                                                label: "Laje Plana (Concreto)",
                                            },
                                            {
                                                value: "madeira",
                                                label: "Telhado com Estrutura de Madeira",
                                            },
                                            {
                                                value: "embutido",
                                                label: "Telhado Embutido (Platibanda)",
                                            },
                                            {
                                                value: "shingle",
                                                label: "Telha Shingle (Asfáltica)",
                                            },
                                            {
                                                value: "verde",
                                                label: "Telhado Verde (com vegetação)",
                                            },
                                        ]}
                                        value={
                                            addresses[idx].fields.roof_type ||
                                            "ceramica"
                                        }
                                        required
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "roof_type",
                                                e.target.value
                                            )
                                        }
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
                                        value={
                                            address.energyInfo
                                                .average_monthly_consumption_kwh ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "energyInfo.average_monthly_consumption_kwh",
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        regex="^\d+(,\d{1,2})?$"
                                        formatFunction={formatDecimalNumber}
                                        suffix="kWh"
                                    />
                                    <InputField
                                        label="Consumo Médio Anual (kWh)"
                                        name={`addresses[${idx}].energyInfo.average_annual_consumption_kwh`}
                                        required
                                        value={
                                            address.energyInfo
                                                .average_annual_consumption_kwh ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "energyInfo.average_annual_consumption_kwh",
                                                e.target.value
                                            )
                                        }
                                        regex="^\d+(,\d{1,2})?$"
                                        formatFunction={formatDecimalNumber}
                                        suffix="kWh"
                                    />
                                    <InputField
                                        label="Conta de Energia Média (R$)"
                                        name={`addresses[${idx}].energyInfo.average_energy_bill`}
                                        required
                                        value={
                                            address.energyInfo
                                                .average_energy_bill || ""
                                        }
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "energyInfo.average_energy_bill",
                                                e.target.value
                                            )
                                        }
                                        regex="^\d+(,\d{1,2})?$"
                                        formatFunction={formatDecimalNumber}
                                        prefix="R$"
                                    />
                                    <InputField
                                        label="Concessionária de Energia"
                                        name={`addresses[${idx}].energyInfo.energy_provider`}
                                        required
                                        value={
                                            address.energyInfo
                                                .energy_provider || ""
                                        }
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "energyInfo.energy_provider",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputField
                                        label="Observações"
                                        name={`addresses[${idx}].energyInfo.notes`}
                                        textarea
                                        optional
                                        value={address.energyInfo.notes || ""}
                                        onChange={(e) =>
                                            handleAddressFieldChange(
                                                address.id,
                                                "energyInfo.notes",
                                                e.target.value
                                            )
                                        }
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
                                        setConfirmRemoveEnergyInfoId(
                                            address.id
                                        );
                                    }
                                }}
                                onRemoveCard={() =>
                                    setConfirmRemoveAdressId(address.id)
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
                    <SubmitButton
                        text="Cadastrar"
                        onClick={(e) => {
                            e.preventDefault();
                            setConfirmSubmitForm(true);
                        }}
                    />
                </div>
            </form>

            <ConfirmModal
                isOpen={!!confirmRemoveAdressId}
                onClose={() => setConfirmRemoveAdressId(null)}
                onConfirm={() => {
                    removeAddressCard(confirmRemoveAdressId);
                    setConfirmRemoveAdressId(null);
                }}
                title="Remover Endereço"
                message="Você tem certeza que deseja remover este endereço? Os dados serão perdidos."
                theme="danger"
            />

            <ConfirmModal
                isOpen={!!confirmRemoveEnergyInfoId}
                onClose={() => setConfirmRemoveEnergyInfoId(null)}
                onConfirm={() => {
                    removeEnergyInfo(confirmRemoveEnergyInfoId);
                    setConfirmRemoveEnergyInfoId(null);
                }}
                title="Remover Informações de Energia Elétrica"
                message="Deseja realmente remover esta seção de informações? Os dados serão perdidos."
                theme="danger"
            />

            <ConfirmModal
                isOpen={!!confirmSubmitForm}
                onClose={() => setConfirmSubmitForm(null)}
                onConfirm={() => {
                    formRef.current?.requestSubmit();
                    setConfirmSubmitForm(null);
                }}
                title="Confirmar Cadastro"
                message="Deseja salvar as alterações realizadas no cadastro do cliente?"
                theme="success"
            />
        </div>
    );
}

Create.layout = (page) => (
  <AppLayout breadcrumb={<CustomBreadcrumb
  items={[
    { name: "Início", href: "/dashboard" },
    { name: "Clientes", href: "/customers" },
    { name: "Cadastro" }
  ]}
/>
}>{page}</AppLayout>
);