import React from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Show({ product }) {
  return (
    <div>
      <h1>Detalhes do Produto</h1>
      <p><strong>Nome:</strong> {product.name}</p>
      <p><strong>Descrição:</strong> {product.description}</p>
      <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
      <p><strong>Marca:</strong> {product.brand}</p>
      <p><strong>Categoria:</strong> {product.category}</p>
      <p><strong>Data:</strong> {product.data}</p>

      <button onClick={() => Inertia.visit(`/products/${product.id}/edit`)}>Editar</button>
      <button onClick={() => Inertia.visit('/products')}>Voltar para lista</button>
    </div>
  );
}
