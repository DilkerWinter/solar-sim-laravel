import InputField from "@/Components/UI/Inputs/InputField";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import { formatDecimal } from "@/Utils/formatNumber";

export default function CreateBaseProduct({ 
  formData, 
  setFormData, 
  productTypes, 
  productTypeForm, 
  setProductTypeForm 
}) {
  const visibleTypes = ["Placa Solar", "Inversor"];

  function handleChange(e) {
    const { name } = e.target;
    let { value } = e.target;
    
     if (name === "price") {
      value = formatDecimal(value);
    } 

    setFormData(prev => ({
        ...prev,
        [name]: value,
    }));
  }

  function handleTypeChange(selectedId) {
    if (!selectedId) {
      setProductTypeForm({
        value: null,
        visible: false
      });
      setFormData(prev => ({
        ...prev,
        type_id: ''
      }));
      return;
    }

    const selectedType = productTypes.find(type => type.id.toString() === selectedId);
    const isVisible = visibleTypes.includes(selectedType.name);
    
    setProductTypeForm({
      value: selectedType,
      visible: isVisible
    });

    setFormData(prev => ({
      ...prev,
      type_id: selectedId
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
        label="Descricao" 
        name="description" 
        required 
        value={formData.description}
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
        value={formData.brand}
        onChange={handleChange}
      />
      <SelectField
        label="Tipo de Produto"
        name="type_id"
        options={productTypes.map(type => ({ value: type.id, label: type.name }))}
        required
        value={formData.type_id} 
        onChange={handleTypeChange}
      />
    </section>
  );
}