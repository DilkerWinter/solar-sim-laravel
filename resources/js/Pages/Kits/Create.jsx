import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import CreateKitForm from "@/Components/Kit/Create/Sections/CreateKitForm";
import CreteKitHeader from "@/Components/Kit/Create/Sections/CreateKitHeader";
import SubmitButton from "@/Components/UI/Inputs/SubmitButton";
import AppLayout from "@/Layouts/AppLayout";
import { useState } from "react";

export default function Create( { products } ) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedProducts: [],
    price: "",
    monthlyKwh: "",
    totalSize: "",
  });

  function handleSubmit(e) {
      e.preventDefault();
      console.log(formData);
      // Inertia.post(route('kits.store'), formData);
  }
  console.log(products);
  return (
    <div>
      <CreteKitHeader/>

      <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto space-y-8 bg-white rounded-2xl p-6">
        
        <CreateKitForm formData={formData} setFormData={setFormData} products={products}/>
        
        <div className="flex justify-end">
          <SubmitButton text={"Cadastrar"}onSubmit={handleSubmit} />
        </div>

      </form>
    </div>
  );
}

Create.layout = (page) => (
  <AppLayout breadcrumb={<CustomBreadcrumb
  items={[
    { name: "Início", href: "/dashboard" },
    { name: "Kits", href: "/kits" },
    { name: "Cadastro" }
  ]}
/>
}>{page}</AppLayout>
);
