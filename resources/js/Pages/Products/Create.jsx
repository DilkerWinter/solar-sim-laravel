import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    data: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    const product = {
      name: "Painel Solar 550W",
      description: "Painel solar monocristalino de alta eficiência para geração de energia.",
      price: 129990,
      brand: "EcoEnergy",
      type: "SOLARPANEL",
      solarPanel: {
        potency_watts: 550,
        efficiency_percentage: 21,
        average_daily_energy_wh: 2200,
        max_operating_temperature: 85,
        operating_voltage: 48, 
        height: 2000,
        width: 1000, 
        weight: 25   
      }
    };

    Inertia.post('/products', product);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Criar Produto Teste Deploy</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
