import React from 'react';

export default function Show({ Customer }) {
  return (
    <div>
      <h1>Detalhes do Cliente</h1>

      <p><strong>Nome:</strong> {Customer.name}</p>
      <p><strong>Telefone:</strong> {Customer.phone}</p>
      <p><strong>Email:</strong> {Customer.email}</p>
      <p><strong>Documento:</strong> {Customer.document_number}</p>

      <h2>Endereços</h2>
      {Customer.addresses && Customer.addresses.length > 0 ? (
        Customer.addresses.map((address) => (
          <div key={address.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
            <p><strong>Tipo:</strong> {address.type}</p>
            <p><strong>Telhado:</strong> {address.roof_type}</p>
            <p><strong>Rua:</strong> {address.street}, {address.number}</p>
            <p><strong>Bairro:</strong> {address.neighborhood}</p>
            <p><strong>Cidade:</strong> {address.city} - {address.state}</p>
            <p><strong>CEP:</strong> {address.cep}</p>

            {address.address_energy_info && (
              <>
                <h4>Informações de Energia</h4>
                <p><strong>Média Mensal (kWh):</strong> {address.address_energy_info.average_monthly_consumption_kwh}</p>
                <p><strong>Média Anual (kWh):</strong> {address.address_energy_info.average_annual_consumption_kwh}</p>
                <p><strong>Conta Média de Energia:</strong> R$ {address.address_energy_info.average_energy_bill}</p>
                <p><strong>Fornecedor:</strong> {address.address_energy_info.energy_provider}</p>
                <p><strong>Observações:</strong> {address.address_energy_info.notes}</p>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Nenhum endereço cadastrado.</p>
      )}
    </div>
  );
}
