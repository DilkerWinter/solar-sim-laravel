import InputField from "@/Components/Customer/Create/InputText";
import SelectField from "@/Components/Customer/Create/SelectInput";

export default function CreateBaseProduct( { formData, productTypes, setFormData, setProductTypeForm } ) {

    return (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <InputField label="Nome" name="name" required />
                <InputField label="Descricao" name="description" required />
                <InputField label="Preco" name="price" required />
                <InputField label="Marca" name="Brand" required />
                <SelectField label="Tipo de Produto" options={productTypes} required />
            </section>
    );
}
