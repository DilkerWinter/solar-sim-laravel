import CustomBreadcrumb from '@/Components/AppLayout/CustomBreadcrumb';
import ProductHeaderSection from '@/Components/Product/Show/Sections/ProductHeaderSection';
import ProductSection from '@/Components/Product/Show/Sections/ProductSection';
import AppLayout from '@/Layouts/AppLayout';
import { capitalize } from '@/Utils/capitalize';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function Show({ product }) {
      const [isEditing, setIsEditing] = useState(false);
      const [editProduct, setEditProduct] = useState({ ...product });
  
      const handleToggleEdit = () => setIsEditing((prev) => !prev);
  
      const handleDelete = () => {
          Inertia.delete(route("products.destroy", product.id));
      };
  
      const handleCancel = () => {
          setEditProduct({ ...product });
          handleToggleEdit();
      }
  
      const handleSave = () => {
          console.log(editProduct)
  
        // Inertia.put(route("products.update", product.id), filterData, {
        //   onSuccess: () => {
        //       handleToggleEdit();
        //   },
        // });
      };

  return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
            <ProductHeaderSection
                  isEditing={isEditing}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onToggleEdit={handleToggleEdit}
            />
            <ProductSection
              product={editProduct}
              setProduct={setEditProduct}
              isEditing={isEditing}
              onDelete={handleDelete}
            />
      </div>
  );
}

Show.layout = (page) => {
    const product = page.props.product;

    return (
        <AppLayout
            breadcrumb={
                <CustomBreadcrumb
                    items={[
                        { name: "Início", href: "/dashboard" },
                        { name: "Produtos", href: "/products" },
                        { name: capitalize(product.name) || "Detalhes" },
                    ]}
                />
            }
        >
            {page}
        </AppLayout>
    );
};
