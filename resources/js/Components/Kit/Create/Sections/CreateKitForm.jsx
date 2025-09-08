import InputField from "@/Components/UI/Inputs/InputField";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import { useState } from "react";

export default function CreateKitForm({ formData, setFormData, products }) {
  const {selectedInverters, setSelectedInverters} = useState([]);
  const {selectedSolarPanels, setSelectedSolarPanels} = useState([]);
  const {selectedBaseProducts, setSelectedBaseProducts} = useState([]);

  const defaultSolarPanels = products.solarPanels;
  const defaultInverters = products.inverters;
  const defaultBaseProducts = products.baseProducts;

  function handleChange(e) {
    const { name } = e.target;
    let { value } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]: value,
    }));
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField 
        label="Nome" 
        name="name" 
        required 
        value={formData.name}
        onChange={handleChange}
      />
      <InputField 
        label="Preco" 
        name="price" 
        type="text"
        required 
        value={formData.price}
        onChange={handleChange}
        prefix={"R$"}
      />
      <InputField 
        label="Marca" 
        name="brand" 
        required 
        onChange={handleChange}
      />
    </section>
  );
}