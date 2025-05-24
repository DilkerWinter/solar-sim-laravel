import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    data: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Inertia.post('/products', form);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Criar Produto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Preço"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="brand"
            placeholder="Marca"
            value={form.brand}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="category"
            placeholder="Categoria"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="data"
            placeholder="Data (JSON)"
            value={form.data}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
