import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import CreateKitForm from "@/Components/Kit/Create/Sections/CreateKitForm";
import CreteKitHeader from "@/Components/Kit/Create/Sections/CreateKitHeader";
import SubmitButton from "@/Components/UI/Inputs/SubmitButton";
import AppLayout from "@/Layouts/AppLayout";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

export default function Create() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  function handleSubmit(e) {
      e.preventDefault();
      console.log(formData)
    //   Inertia.post(route('employee.store'), formData);
  }

  return (
    <div>
      <CreteKitHeader/>

      <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto space-y-8 bg-white rounded-2xl p-6">
        
        <CreateKitForm formData={formData} setFormData={setFormData}/>
        
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
    { name: "Funcionario", href: "/employees" },
    { name: "Cadastro" }
  ]}
/>
}>{page}</AppLayout>
);
