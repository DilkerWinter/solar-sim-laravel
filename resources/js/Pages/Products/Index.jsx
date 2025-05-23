import React from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ products }) {
  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - R$ {product.price.toFixed(2)}{' '}
            <button onClick={() => Inertia.visit(`/products/${product.id}`)}>Ver</button>{' '}
            <button onClick={() => Inertia.visit(`/products/${product.id}/edit`)}>Editar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => Inertia.visit('/products/create')}>Criar novo produto</button>
    </div>
  );
}
