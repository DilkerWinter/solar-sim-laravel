import React from 'react';
import CustomerCard from '../UI/CustomerCard';
import AddressCard from '../UI/AddressCard';

export default function CustomerSection({
  customer,
  isEditing,
  onDelete,
  onUpdate,
}) {
  if (!customer) {
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded">
        Erro: dados do cliente não encontrados.
      </div>
    );
  }

  return (
    <section className="mb-8">
      <CustomerCard
        customer={customer}
        isEditing={isEditing}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </section>
  );
}
