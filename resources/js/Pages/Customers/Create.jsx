import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Create() {
  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
  } = useForm({
    name: "",
    phone: "",
    email: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    average_monthly_consumption_kwh: "",
    average_annual_consumption_kwh: "",
    average_energy_bill: "",
    energy_provider: "",
    installation_type: "",
    roof_type: "",
    notes: "",
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("customers.store"), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout>
      <Head title="Create Customer" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Customer</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={data.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={data.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Energy Provider */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="energy_provider"
              >
                Energy Provider
              </label>
              <input
                id="energy_provider"
                name="energy_provider"
                type="text"
                value={data.energy_provider}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
              {errors.energy_provider && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.energy_provider}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Street */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="street">
                  Street
                </label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  value={data.street}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.street && (
                  <p className="text-red-600 text-sm mt-1">{errors.street}</p>
                )}
              </div>

              {/* Number */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="number">
                  Number
                </label>
                <input
                  id="number"
                  name="number"
                  type="text"
                  value={data.number}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.number && (
                  <p className="text-red-600 text-sm mt-1">{errors.number}</p>
                )}
              </div>

              {/* Neighborhood */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="neighborhood"
                >
                  Neighborhood
                </label>
                <input
                  id="neighborhood"
                  name="neighborhood"
                  type="text"
                  value={data.neighborhood}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.neighborhood && (
                  <p className="text-red-600 text-sm mt-1">{errors.neighborhood}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={data.city}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="state">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={data.state}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.state && (
                  <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>
          </div>

          {/* Consumption & Billing */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Consumption & Billing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Monthly kWh */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="average_monthly_consumption_kwh"
                >
                  Average Monthly Consumption (kWh)
                </label>
                <input
                  id="average_monthly_consumption_kwh"
                  name="average_monthly_consumption_kwh"
                  type="number"
                  value={data.average_monthly_consumption_kwh}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.average_monthly_consumption_kwh && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.average_monthly_consumption_kwh}
                  </p>
                )}
              </div>

              {/* Average Annual kWh */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="average_annual_consumption_kwh"
                >
                  Average Annual Consumption (kWh)
                </label>
                <input
                  id="average_annual_consumption_kwh"
                  name="average_annual_consumption_kwh"
                  type="number"
                  value={data.average_annual_consumption_kwh}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.average_annual_consumption_kwh && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.average_annual_consumption_kwh}
                  </p>
                )}
              </div>

              {/* Average Energy Bill */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="average_energy_bill"
                >
                  Average Energy Bill (\$)
                </label>
                <input
                  id="average_energy_bill"
                  name="average_energy_bill"
                  type="number"
                  value={data.average_energy_bill}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.average_energy_bill && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.average_energy_bill}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Installation Details */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Installation Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Installation Type */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="installation_type"
                >
                  Installation Type
                </label>
                <select
                  id="installation_type"
                  name="installation_type"
                  value={data.installation_type}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  <option value="">Select...</option>
                  <option value="residential">Residential</option>
                  <option value="industrial">Industrial</option>
                  <option value="commercial">Commercial</option>
                </select>
                {errors.installation_type && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.installation_type}
                  </p>
                )}
              </div>

              {/* Roof Type */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="roof_type"
                >
                  Roof Type
                </label>
                <input
                  id="roof_type"
                  name="roof_type"
                  type="text"
                  value={data.roof_type}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                />
                {errors.roof_type && (
                  <p className="text-red-600 text-sm mt-1">{errors.roof_type}</p>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={data.notes}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            ></textarea>
            {errors.notes && (
              <p className="text-red-600 text-sm mt-1">{errors.notes}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 disabled:opacity-50"
            >
              {processing ? "Saving..." : "Save"}
            </button>
            <Link
              href={route("customers.index")}
              className="text-indigo-600 hover:underline"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
