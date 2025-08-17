import CustomBreadcrumb from '@/Components/AppLayout/CustomBreadcrumb';
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
                <CreateExtraProduct selectedProductType={productTypeForm.value} onExtraDataChange={setExtraProductData}/>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Criar Produto
          </button>
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
