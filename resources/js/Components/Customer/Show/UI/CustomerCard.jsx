import { User } from "lucide-react";

export default function CustomerCard( {customer} ) {

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-blue-100 text-blue-700">
          <User className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Informações do Cliente</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p className="text-sm text-gray-500">Nome</p>
          <p className="font-semibold">{customer.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{customer.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Telefone</p>
          <p className="font-semibold">{customer.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">CPF/CNPJ</p>
          <p className="font-semibold">{customer.document_number}</p>
        </div>
      </div>
    </div>
  );
}
