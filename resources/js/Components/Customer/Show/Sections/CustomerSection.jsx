import React from 'react';
import { Edit3 } from 'lucide-react'; // Certifique-se de ter o pacote instalado
import CustomerCard from '../UI/CustomerCard';

export default function CustomerSection({
  customer,
  isEditing,
  onToggleEdit,
  onDelete,
  onUpdate,
}) {
  return (
    <section className="mb-8">
      {/* Header da seção */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Informações do Cliente</h2>
          <p className="text-gray-600">Gerencie os dados cadastrais do cliente</p>
        </div>

        <button
          onClick={onToggleEdit}
          className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition ${
            isEditing
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'border border-blue-500 text-blue-500 hover:bg-blue-50'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          {isEditing ? 'Salvar' : 'Editar'}
        </button>
      </div>

      {/* Card do Cliente */}
      <CustomerCard
        customer={customer}
        isEditing={isEditing}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </section>
  );
}
