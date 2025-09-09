import InputField from "@/Components/UI/Inputs/InputField";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import MultiSelectField from "@/Components/UI/Inputs/SelectInput";
import { useState, useEffect } from "react";

export default function CreateKitForm({ formData, setFormData, products }) {
    const [selectedInverters, setSelectedInverters] = useState([]);
    const [selectedSolarPanels, setSelectedSolarPanels] = useState([]);
    const [selectedBaseProducts, setSelectedBaseProducts] = useState([]);

    const [optionsInverters, setOptionsInverters] = useState([]);
    const [optionsSolarPanels, setOptionsSolarPanels] = useState([]);
    const [optionsBaseProducts, setOptionsBaseProducts] = useState([]);

    useEffect(() => {
        setOptionsInverters(products.inverters || []);
        setOptionsSolarPanels(products.solarPanels || []);
        setOptionsBaseProducts(products.baseProducts || []);
    }, [products]);

  function handleSelect(value, selectedList, setSelectedList, optionsList, setOptionsList) {
    const selectedItem = optionsList.find(item => item.id === Number(value));
    if (!selectedItem) return;
    
    setSelectedList([...selectedList, selectedItem]);
    setOptionsList(optionsList.filter(item => item.id !== Number(value)));
  }

  return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
              label="Nome"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <InputField
              label="Descrição"
              name="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <InputField
              label="Preço"
              name="price"
              type="text"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              prefix={"R$"}
          />
          <SelectField
              label="Painéis Solares"
              name="solarPanels"
              placeholder="Selecione um Painel Solar"
              options={optionsSolarPanels.map(sp => ({ value: sp.id, label: `${sp.name} - ${sp.brand}` }))}
              value={""}
              onChange={(value) => handleSelect(value, selectedSolarPanels, setSelectedSolarPanels, optionsSolarPanels, setOptionsSolarPanels)}
          />
          
          <SelectField
              label="Inversores"
              name="inverters"
              placeholder="Selecione um Inversor"
              options={optionsInverters.map(inv => ({ value: inv.id, label: `${inv.name} - ${inv.brand}` }))}
              value={""}
              onChange={(value) => handleSelect(value, selectedInverters, setSelectedInverters, optionsInverters, setOptionsInverters)}
          />
          <SelectField
              label="Produtos Base"
              name="baseProducts"
              placeholder="Selecione um Produto"
              options={optionsBaseProducts.map(bp => ({ value: bp.id, label: `${bp.name} - ${bp.brand}` }))}
              value={""}
              onChange={(value) => handleSelect(value, selectedBaseProducts, setSelectedBaseProducts, optionsBaseProducts, setOptionsBaseProducts)}
          />
      </section>
  );
}
