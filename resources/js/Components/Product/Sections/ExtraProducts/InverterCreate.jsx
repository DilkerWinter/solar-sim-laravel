import { useEffect, useState } from "react";
import InputText from "../../../Customer/Create/InputText";
import SelectField from "@/Components/Customer/Create/SelectInput";

export default function InverterCreate({ onDataChange }) {
    const [inverterFormData, setInverterFormData] = useState({
        type: "",
        supported_panel_count: "",
        supported_panel_max_power_watts: "",
        max_power_watts: "",
        operating_voltage: "",
    });

    const inverterTypeOptions = [
        { value: "Microinversor", label: "Microinversor" },
        { value: "Bifásico", label: "Bifásico" },
        { value: "Trifásico", label: "Trifásico" },
        { value: "Hibrido", label: "Hibrido" },
    ];

    function formatMoney(value) {
        if (value == null || value === "") return "0,00";
        let digits = String(value).replace(/\D/g, "");
        if (digits === "") return "0,00";
        const number = parseFloat(digits) / 100;
        return number.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    useEffect(() => {
        onDataChange(inverterFormData);
    }, [inverterFormData, onDataChange]);

    function handleChange(e) {
        const { name, value } = e.target;

        let formattedValue = value;

        if (
            name === "operating_voltage" ||
            name === "max_power_watts" ||
            name == "supported_panel_max_power_watts"
        ) {
            formattedValue = formatMoney(value);
        } else if (name === "type") {
            formattedValue = value;
        }

        setInverterFormData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    }

    function handleSelectChange(value) {
        setInverterFormData((prev) => ({
            ...prev,
            type: value,
        }));
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SelectField
                label="Tipo"
                name="type"
                options={inverterTypeOptions}
                required
                value={inverterFormData.type}
                onChange={handleSelectChange}
                placeholder="Selecione o tipo do inversor"
            />

            <InputText
                label="Quantidade de Painéis Suportados"
                name="supported_panel_count"
                type="text"
                required
                value={inverterFormData.supported_panel_count}
                onChange={handleChange}
            />

            <InputText
                label="Potência Máxima dos Painéis Suportados"
                name="supported_panel_max_power_watts"
                type="text"
                required
                value={inverterFormData.supported_panel_max_power_watts}
                onChange={handleChange}
                suffix="W"
            />

            <InputText
                label="Potência Máxima"
                name="max_power_watts"
                type="text"
                required
                value={inverterFormData.max_power_watts}
                onChange={handleChange}
                suffix="W"
            />

            <InputText
                label="Tensão de Operação"
                name="operating_voltage"
                type="text"
                required
                value={inverterFormData.operating_voltage}
                onChange={handleChange}
                suffix="V"
            />
        </section>
    );
}
