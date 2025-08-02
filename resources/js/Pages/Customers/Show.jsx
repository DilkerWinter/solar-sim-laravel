import React, { useState } from "react";
import CustomerShowHeaderSection from "@/Components/Customer/Show/Sections/CustomerShowHeaderSection";
import CustomerSection from "@/Components/Customer/Show/Sections/CustomerSection";
import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import AppLayout from "@/Layouts/AppLayout";
import { Inertia } from "@inertiajs/inertia";
import CustomerAddresSection from "@/Components/Customer/Show/Sections/CustomerAddressSection";

export default function Show({ customer }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editCustomer, setEditCustomer] = useState({ ...customer });

    const handleToggleEdit = () => setIsEditing((prev) => !prev);

    const handleDelete = () => {
        Inertia.delete(route("customers.destroy", customer.id));
    };

    const handleSave = () => {
        handleToggleEdit();
    };


    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <CustomerShowHeaderSection
                isEditing={isEditing}
                onDelete={handleDelete}
                onSave={handleSave}
                onToggleEdit={handleToggleEdit}
            />
            <CustomerSection
                customer={editCustomer}
                setCustomer={setEditCustomer}
                isEditing={isEditing}
            />
            <CustomerAddresSection customer={editCustomer} setCustomer={setEditCustomer} isEditing={isEditing} />
        </div>
    );
}

Show.layout = (page) => {
    const customer = page.props.customer;

    return (
        <AppLayout
            breadcrumb={
                <CustomBreadcrumb
                    items={[
                        { name: "Início", href: "/dashboard" },
                        { name: "Clientes", href: "/customers" },
                        { name: customer.name || "Detalhes" },
                    ]}
                />
            }
        >
            {page}
        </AppLayout>
    );
};
