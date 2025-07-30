import { User } from "lucide-react";
import EditableField from "@/Components/UI/EditableField";
import Field from "./TextField";

export default function CustomerCard({ customer, isEditing, onChange }) {
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
              value={customer.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <EditableField
              label="Email"
              name="email"
              value={customer.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
            <EditableField
              label="Telefone"
              name="phone"
              value={customer.phone}
              onChange={(e) => onChange("phone", e.target.value)}
            />
            <EditableField
              label="CPF/CNPJ"
              name="document_number"
              value={customer.document_number}
              onChange={(e) => onChange("document_number", e.target.value)}
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
