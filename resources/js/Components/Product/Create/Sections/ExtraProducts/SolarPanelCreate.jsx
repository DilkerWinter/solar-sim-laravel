import { useEffect, useState } from "react";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import InputField from "@/Components/UI/Inputs/InputText";

export default function SolarPanelCreate({ onDataChange }) {
  const [solarPanelFormData, setSolarPanelFormData] = useState({
    potency_watts: "",
    efficiency_percentage: "",
    average_daily_energy_wh: "",
    max_operating_temperature: "",
    operating_voltage: "",
    height: "",
    width: "",
    weight: "",
  });

  const operateVoltage = [
        { value: "12", label: "12V"},
        { value: "24", label: "24V"},
    ];

  function formatMoney(value) {
    if (value == null || value === "") return "0,00";
      let digits = String(value).replace(/\D/g, "");
      if (digits === "") return "0,00"
        const number = parseFloat(digits) / 100;
        return number.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
    });
  }

  function handleOperationSelectChange(value) {
    setSolarPanelFormData((prev) => ({
        ...prev,
        operating_voltage: value,
    }));
  }

  useEffect(() => {
    onDataChange(solarPanelFormData);
  }, [solarPanelFormData, onDataChange]);

  function handleChange(e) {
    const { name, value } = e.target;
    setSolarPanelFormData(prev => ({
      ...prev,
      [name]: formatMoney(value)
    }));
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <InputField
        label="Potência"
        name="potency_watts"
        type="text"
        required
        value={solarPanelFormData.potency_watts}
        onChange={handleChange}
        suffix="W"
      />

      <InputField
        label="Eficiência"
        name="efficiency_percentage"
        type="text"
        required
        value={solarPanelFormData.efficiency_percentage}
        onChange={handleChange}
        suffix="%"
      />

      <InputField
        label="Energia Diária Média"
        name="average_daily_energy_wh"
        type="text"
        required
        value={solarPanelFormData.average_daily_energy_wh}
        onChange={handleChange}
        suffix="Wh"
      />

      <InputField
        label="Temperatura Máxima de Operação"
        name="max_operating_temperature"
        type="text"
        required
        value={solarPanelFormData.max_operating_temperature}
        onChange={handleChange}
        suffix="°C"
      />

      <SelectField
          label="Tensão de Operação"
          name="operating_voltage"
          options={operateVoltage}
          required
          value={solarPanelFormData.operating_voltage}
          onChange={handleOperationSelectChange}
          placeholder="Selecione a voltagem da placa"
      />

      <InputField
        label="Altura"
        name="height"
        type="text"
        required
        value={solarPanelFormData.height}
        onChange={handleChange}
        suffix="M"
      />

      <InputField
        label="Largura"
        name="width"
        type="text"
        required
        value={solarPanelFormData.width}
        onChange={handleChange}
        suffix="M"
      />

      <InputField
        label="Peso"
        name="weight"
        type="text"
        required
        value={solarPanelFormData.weight}
        onChange={handleChange}
        suffix="Kg"
      />
    </section>
  );
}