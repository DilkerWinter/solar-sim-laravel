import React, { useState } from 'react';
import CustomerShowHeaderSection from '@/Components/Customer/Show/Sections/CustomerShowHeaderSection';
import CustomerSection from '@/Components/Customer/Show/Sections/CustomerSection';

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
