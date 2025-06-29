import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Index({ customers = [] }) {
  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      Inertia.delete(`/customers/${id}`);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Customers</h1>

        <ul className="space-y-4">
          {customers.length > 0 ? (
            customers.map(customer => (
              <li
                key={customer.id}
                className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
              >
                <strong className="text-lg text-gray-900">{customer.name}</strong>
                <div className="space-x-2">
                  <button
                    onClick={() => Inertia.get(`/customers/${customer.id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => Inertia.get(`/customers/${customer.id}/edit`)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Nenhum cliente cadastrado.</li>
          )}
        </ul>

        <Link
          href="/customers/create"
          className="inline-block mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Criar novo cliente
        </Link>
      </div>
    </AppLayout>
  );
}
