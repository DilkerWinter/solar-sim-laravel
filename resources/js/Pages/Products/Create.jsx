import CustomBreadcrumb from '@/Components/AppLayout/CustomBreadcrumb';
import CreateBaseProduct from '@/Components/Product/Sections/CreateBaseProduct';
import CreateExtraProduct from '@/Components/Product/Sections/CreateExtraProduct';
import CreteProductHeader from '@/Components/Product/Sections/CreteProductHeader';
import AppLayout from '@/Layouts/AppLayout';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function Create( { productTypes } ) {
  const [formData, setFormData] = useState({});
  const [productTypeForm, setProductTypeForm] = useState({visible: false, value: ""});

  function handleSubmit(e) {
    e.preventDefault();
    const product = {
      name: "Painel Solar 550W",
      description: "Painel solar monocristalino de alta eficiência para geração de energia.",
      price: 129990,
      brand: "EcoEnergy",
      type_id: "1",
      solar_panel: {
        potency_watts: 550,
        efficiency_percentage: 21,
        average_daily_energy_wh: 2200,
        max_operating_temperature: 85,
        operating_voltage: 48,
        height: 2000,
        width: 1000,
        weight: 25
      }
    };

    Inertia.post('/products', product);
  }

  return (
    <div>
      <CreteProductHeader/>

      <form className="w-full max-w-5xl mx-auto space-y-8 bg-white rounded-2xl p-6">
        
        <CreateBaseProduct formData={formData} productTypes={productTypes} setFormData={setFormData} setProductTypeForm={setProductTypeForm} productTypeForm={productTypeForm}/>
        
        {productTypeForm.visible && (
                <CreateExtraProduct selectedProductType={productTypeForm.value}/>
        )}

      </form>
    </div>
  );
}

Create.layout = (page) => (
  <AppLayout breadcrumb={<CustomBreadcrumb
  items={[
    { name: "Início", href: "/dashboard" },
    { name: "Produtos", href: "/products" },
    { name: "Cadastro" }
  ]}
/>
}>{page}</AppLayout>
);
