import InputField from "@/Components/UI/Inputs/InputText";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import { formatMoney } from "@/Utils/formatMoney";
import { useEffect, useState } from "react";

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

    const operateVoltage = [
        { value: "110", label: "110V"},
        { value: "220", label: "220V"},
    ];

    useEffect(() => {
        onDataChange(inverterFormData);
    }, [inverterFormData, onDataChange]);

    function handleChange(e) {
        const { name, value } = e.target;

        let formattedValue = value;

        if (name === "max_power_watts" || name == "supported_panel_max_power_watts") {
            formattedValue = formatMoney(value);
        } else {
            formattedValue = value;
        } 

        setInverterFormData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    }

    function handleTypeSelectChange(value) {
        setInverterFormData((prev) => ({
            ...prev,
            type: value,
        }));
    }

    function handleOperationSelectChange(value) {
        setInverterFormData((prev) => ({
            ...prev,
            operating_voltage: value,
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
                onChange={handleTypeSelectChange}
                placeholder="Selecione o tipo do inversor"
            />

            <InputField
                label="Quantidade de Painéis Suportados"
                name="supported_panel_count"
                type="number"
                required
                value={inverterFormData.supported_panel_count}
                onChange={handleChange}
            />

            <InputField
                label="Potência Máxima dos Painéis Suportados"
                name="supported_panel_max_power_watts"
                type="text"
                required
                value={inverterFormData.supported_panel_max_power_watts}
                onChange={handleChange}
                suffix="W"
            />

            <InputField
                label="Potência Máxima"
                name="max_power_watts"
                type="text"
                required
                value={inverterFormData.max_power_watts}
                onChange={handleChange}
                suffix="W"
            />

            <SelectField
                label="Tensão de Operação"
                name="operating_voltage"
                options={operateVoltage}
                required
                value={inverterFormData.operating_voltage}
                onChange={handleOperationSelectChange}
                placeholder="Selecione a voltagem do inversor"
            />
        </section>
    );
}
