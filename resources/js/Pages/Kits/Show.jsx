import CustomBreadcrumb from '@/Components/AppLayout/CustomBreadcrumb';
import KitHeaderSection from '@/Components/Kit/Show/Sections/KitHeaderSection';
import KitSection from '@/Components/Kit/Show/Sections/KitSection';
import AppLayout from '@/Layouts/AppLayout';
import { capitalize } from '@/Utils/capitalize';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function Show({ kit }) {
      const [isEditing, setIsEditing] = useState(false);
      const [editKit, setEditKit] = useState({ ...kit });
  
      const handleToggleEdit = () => setIsEditing((prev) => !prev);
  
      const handleDelete = () => {
          Inertia.delete(route("kits.destroy", kit.id));
      };
  
      const handleCancel = () => {
          setEditKit({ ...kit });
          handleToggleEdit();d
      }
  
      const handleSave = () => {
        console.log(editKit)
        // Inertia.put(route("kits.update", kit.id), editKit, {
        //   onSuccess: () => {
        //       handleToggleEdit();
        //   },
        // });
      };

  return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
            <KitHeaderSection
                isEditing={isEditing}
                onSave={handleSave}
                onCancel={handleCancel}
                onToggleEdit={handleToggleEdit}
            />
            <KitSection
                kit={editKit}
                setKit={setEditKit}
                isEditing={isEditing}
                onDelete={handleDelete}
            />
      </div>
  );
}

Show.layout = (page) => {
    const kit = page.props.kit;

    return (
        <AppLayout
            breadcrumb={
                <CustomBreadcrumb
                    items={[
                        { name: "Início", href: "/dashboard" },
                        { name: "Kits", href: "/kits" },
                        { name: capitalize(kit.name) || "Detalhes" },
                    ]}
                />
            }
        >
            {page}
        </AppLayout>
    );
};
