import React, { useState } from 'react';

export default function CustomerCard({ customer, isEditing, onDelete, onUpdate }) {
  const [formData, setFormData] = useState({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    document_number: customer.document_number,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    onUpdate({ [name]: value });
  };

  return (
    <div className="bg-white shadow-sm border border-blue-100 rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div className="text-gray-800 space-y-2 w-full">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm text-gray-600">Nome</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Telefone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Documento</label>
                <input
                  name="document_number"
                  value={formData.document_number}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Nome:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Telefone:</strong> {customer.phone}</p>
              <p><strong>Documento:</strong> {customer.document_number}</p>
            </>
          )}
        </div>

        <button
          onClick={onDelete}
          className="text-sm text-red-500 hover:underline ml-4"
        >
          Deletar Cliente
        </button>
      </div>
    </div>
  );
}
