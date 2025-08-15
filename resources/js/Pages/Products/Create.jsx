import CustomBreadcrumb from '@/Components/AppLayout/CustomBreadcrumb';
import CreateBaseProduct from '@/Components/Product/Sections/CreateBaseProduct';
import CreteProductHeader from '@/Components/Product/Sections/CreteProductHeader';
import AppLayout from '@/Layouts/AppLayout';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function Create() {
  const [formData, setFormData] = useState({});
  const [showExtraField, setshowExtraField] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    const product = {
      name: "Painel Solar 550W",
      description: "Painel solar monocristalino de alta eficiência para geração de energia.",
      price: 129990,
      brand: "EcoEnergy",
      type: "Painel Solar",
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
      <CreateBaseProduct showExtraField={showExtraField}/>
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
