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
    <div>
      <h1>Criar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} required />
        <input type="number" step="0.01" name="price" placeholder="Preço" value={form.price} onChange={handleChange} required />
        <input name="brand" placeholder="Marca" value={form.brand} onChange={handleChange} required />
        <input name="category" placeholder="Categoria" value={form.category} onChange={handleChange} required />
        <textarea name="data" placeholder="Data (JSON)" value={form.data} onChange={handleChange} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
