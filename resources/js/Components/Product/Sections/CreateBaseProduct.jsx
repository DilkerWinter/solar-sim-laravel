import InputField from "@/Components/Customer/Create/InputText";
import SelectField from "@/Components/Customer/Create/SelectInput";

export default function CreateBaseProduct({ 
  formData, 
  setFormData, 
  productTypes, 
  productTypeForm, 
  setProductTypeForm 
}) {
  const visibleTypes = ["Placa Solar", "Inversor"];

  function handleTypeChange(selectedId) {
    if (!selectedId) {
      setProductTypeForm({
        value: null,
        visible: false
      });
      return;
    }

    const selectedType = productTypes.find(type => type.id.toString() === selectedId);
    const isVisible = visibleTypes.includes(selectedType.name);
    
    setProductTypeForm({
      value: selectedType,
      visible: isVisible
    });
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField label="Nome" name="name" required />
      <InputField label="Descricao" name="description" required />
      <InputField label="Preco" name="price" required />
      <InputField label="Marca" name="Brand" required />
      <SelectField
        label="Tipo de Produto"
        options={productTypes.map(type => ({ value: type.id, label: type.name }))}
        required
        value={productTypeForm.value?.id} 
        onChange={handleTypeChange}
      />
    </section>
  );
}