import { User } from "lucide-react";
import EditableField from "@/Components/UI/EditableField";
import { useState, useEffect } from "react";

export default function CustomerCard({ customer, isEditing }) {
  const [editedCustomer] = useState({ ...customer });

  const handleChange = (field, value) => {
    setEditedCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-blue-100 text-blue-700">
          <User className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Informações do Cliente</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
        {isEditing ? (
          <>
            <EditableField
              label="Nome"
              name="name"
              value={editedCustomer.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <EditableField
              label="Email"
              name="email"
              value={editedCustomer.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <EditableField
              label="Telefone"
              name="phone"
              value={editedCustomer.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <EditableField
              label="CPF/CNPJ"
              name="document_number"
              value={editedCustomer.document_number}
              onChange={(e) => handleChange("document_number", e.target.value)}
            />
          </>
        ) : (
          <>
            <Field label="Nome" value={customer.name} />
            <Field label="Email" value={customer.email} />
            <Field label="Telefone" value={customer.phone} />
            <Field label="CPF/CNPJ" value={customer.document_number} />
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
