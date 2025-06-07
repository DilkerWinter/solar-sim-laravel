import React, { cloneElement } from 'react';

export default function Create() {
  return (
    <div className="w-full h-full px-6 py-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro do Cliente</h1>

      {/* Aqui você pode começar o formulário */}
      <form className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            name="nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            name="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Telefone</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            name="telefone"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

