import { User } from "lucide-react";

export default function CustomerCard( { customer } ){
  return(
    <div className="p-6 bg-white rounded-2xl shadow-md border-gray-200 border w-full">
      <div className="flex items-center gap-2 mb-4 text-2xl">
        <User size={26} />
        <p className="font-medium ">Informações Pessoais</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="text-sm text-gray-600">Nome</p>
          <p className="font-semibold">{customer.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Email</p>
          <p className="font-semibold">{customer.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Telefone</p>
          <p className="font-semibold">{customer.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Documento</p>
          <p className="font-semibold">{customer.document_number}</p>
        </div>
      </div>

    </div>
  );
}