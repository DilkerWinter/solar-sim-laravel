import React from 'react';

export default function Show({ customer }) {
  return (
    <div>
      <h1>Detalhes do Customer</h1>
      <p><strong>Nome:</strong> {customer.name}</p>

    </div>
  );
}
