import React from 'react';
import { useForm } from '@inertiajs/react';

/**
 * 
 * @returns Registers a new client in the system
 */
export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    phone: '',
    email: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    average_monthly_consumption_kwh: '',
    average_annual_consumption_kwh: '',
    average_energy_bill: '',
    energy_provider: '',
    installation_type: '',
    roof_type: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('clients.store'));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-400 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border rounded p-2" />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>
        
        <div>
          <label>Phone</label>
          <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full border rounded p-2" />
        </div>

        <div>
          <label>Email</label>
          <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full border rounded p-2" />
        </div>

        <h2 className="font-semibold mt-4">Address</h2>

        <div>
          <label>Street</label>
          <input type="text" value={data.street} onChange={e => setData('street', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>Number</label>
          <input type="text" value={data.number} onChange={e => setData('number', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>Neighborhood</label>
          <input type="text" value={data.neighborhood} onChange={e => setData('neighborhood', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>City</label>
          <input type="text" value={data.city} onChange={e => setData('city', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>State</label>
          <input type="text" value={data.state} onChange={e => setData('state', e.target.value)} className="w-full border rounded p-2" />
        </div>

        <h2 className="font-semibold mt-4">Energy Info</h2>

        <div>
          <label>Monthly kWh</label>
          <input type="number" value={data.average_monthly_consumption_kwh} onChange={e => setData('average_monthly_consumption_kwh', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>Annual kWh</label>
          <input type="number" value={data.average_annual_consumption_kwh} onChange={e => setData('average_annual_consumption_kwh', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>Average Bill (R$)</label>
          <input type="number" value={data.average_energy_bill} onChange={e => setData('average_energy_bill', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>Energy Provider</label>
          <input type="text" value={data.energy_provider} onChange={e => setData('energy_provider', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>Installation Type</label>
          <select value={data.installation_type} onChange={e => setData('installation_type', e.target.value)} className="w-full border rounded p-2">
            <option value="">Select...</option>
            <option value="residential">Residential</option>
            <option value="industrial">Industrial</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label>Roof Type</label>
          <input type="text" value={data.roof_type} onChange={e => setData('roof_type', e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div>
          <label>Notes</label>
          <textarea value={data.notes} onChange={e => setData('notes', e.target.value)} className="w-full border rounded p-2" />
        </div>

        <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}