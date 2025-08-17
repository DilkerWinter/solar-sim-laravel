import CustomBreadcrumb from '@/Components/AppLayout/CustomBreadcrumb';
import SubmitButton from '@/Components/Customer/Create/SubmitButton';
import CreateBaseProduct from '@/Components/Product/Sections/CreateBaseProduct';
import CreateExtraProduct from '@/Components/Product/Sections/CreateExtraProduct';
import CreteProductHeader from '@/Components/Product/Sections/CreteProductHeader';
import AppLayout from '@/Layouts/AppLayout';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function Create( { productTypes } ) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    brand: '',
    type_id: '',
    extra_product: {},
  });
  const [extraProductData, setExtraProductData] = useState({});
  const [productTypeForm, setProductTypeForm] = useState({visible: false, value: ""});

  function handleSubmit(e) {
      e.preventDefault();

      const formatedData = {
        ...formData,
        extra_product: extraProductData
      };

      console.log('Complete Form Data:', formatedData);
      // Inertia.post(route('products.store'), formatedData);
  }

  return (
    <div>
      <CreteProductHeader/>

      <form
        onSubmit={handleSubmit} 
        className="w-full max-w-5xl mx-auto space-y-8 bg-white rounded-2xl p-6">
        
        <CreateBaseProduct formData={formData} productTypes={productTypes} setFormData={setFormData} setProductTypeForm={setProductTypeForm} productTypeForm={productTypeForm}/>
        
        {productTypeForm.visible && (
            <CreateExtraProduct
                selectedProductType={productTypeForm.value}
                onExtraDataChange={setExtraProductData}
            />
        )}

        <div className="flex justify-end">
          <SubmitButton text={"Cadastrar"}onSubmit={handleSubmit}>
          </SubmitButton>
        </div>

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
