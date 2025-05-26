import React from 'react';

export default function Index({ customers }) {
  return (
    <div>
      <h1>Lista de Costumers</h1>
      <ul>
        {costumers.map(costumer => (
          <li key={costumer.id}>
            <strong>{costumer.name}</strong>
            <button onClick={() => Inertia.visit(`/costumers/${costumer.id}`)}>Ver</button>{' '}
            <button onClick={() => Inertia.visit(`/costumers/${costumer.id}/edit`)}>Editar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => Inertia.visit('/costumers/create')}>Criar novo produto</button>
    </div>
  );
}
