import { useState } from "react";
import InputText from "../../../Customer/Create/InputText";

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

  function handleChange(e) {
    const { name, value } = e.target;
    const numberValue = value === "" ? "" : Number(value);
    
    const updatedData = {
      ...solarPanelFormData,
      [name]: value
    };

    setSolarPanelFormData(updatedData);

    const numberData = Object.keys(updatedData).reduce((acc, key) => {
      acc[key] = updatedData[key] === "" ? "" : Number(updatedData[key]);
      return acc;
    }, {});

    onDataChange(numberData);
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <InputText
        label="Potência"
        name="potency_watts"
        type="number"
        required
        value={solarPanelFormData.potency_watts}
        onChange={handleChange}
        suffix="W"
      />

      <InputText
        label="Eficiência"
        name="efficiency_percentage"
        type="number"
        required
        value={solarPanelFormData.efficiency_percentage}
        onChange={handleChange}
        suffix="%"
      />

      <InputText
        label="Energia Diária Média"
        name="average_daily_energy_wh"
        type="number"
        required
        value={solarPanelFormData.average_daily_energy_wh}
        onChange={handleChange}
        suffix="Wh"
      />

      <InputText
        label="Temperatura Máxima de Operação"
        name="max_operating_temperature"
        type="number"
        required
        value={solarPanelFormData.max_operating_temperature}
        onChange={handleChange}
        suffix="°C"
      />

      <InputText
        label="Tensão de Operação"
        name="operating_voltage"
        type="number"
        required
        value={solarPanelFormData.operating_voltage}
        onChange={handleChange}
        suffix="V"
      />

      <InputText
        label="Altura"
        name="height"
        type="number"
        required
        value={solarPanelFormData.height}
        onChange={handleChange}
        suffix="M"
      />

      <InputText
        label="Largura"
        name="width"
        type="number"
        required
        value={solarPanelFormData.width}
        onChange={handleChange}
        suffix="M"
      />

      <InputText
        label="Peso"
        name="weight"
        type="number"
        required
        value={solarPanelFormData.weight}
        onChange={handleChange}
        suffix="Kg"
      />
    </section>
  );
}