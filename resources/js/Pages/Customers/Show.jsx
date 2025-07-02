import React, { useState } from 'react';
import CustomerShowHeaderSection from '@/Components/Customer/Show/Sections/CustomerShowHeaderSection';
import CustomerSection from '@/Components/Customer/Show/Sections/CustomerSection';
import CustomBreadcrumb from '@/Components/AppLayout/CustomBreadcrumb';
import AppLayout from '@/Layouts/AppLayout';

export default function Show({ customer }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  console.log(customer);

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-6'>
      <CustomerShowHeaderSection
        isEditing={isEditing}
        onToggleEdit={handleToggleEdit}
      />
      <CustomerSection
        customer={customer}
        isEditing={isEditing}
        onToggleEdit={handleToggleEdit}
      />
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
            { name: 'Início', href: '/dashboard' },
            { name: 'Clientes', href: '/customers' },
            { name: customer.name || 'Detalhes' }, 
          ]}
        />
      }
    >
      {page}
    </AppLayout>
  );
};
