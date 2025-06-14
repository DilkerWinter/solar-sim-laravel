<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::with('addresses.addressEnergyInfo')->get();
        return Inertia::render('Customers/Index', ['customers' => $customers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'document_number' => 'nullable|string|max:50',

            'addresses' => 'nullable|array',
            'addresses.*.id' => 'nullable|integer|exists:addresses,id',
            'addresses.*.neighborhood' => 'nullable|string|max:255',
            'addresses.*.street' => 'nullable|string|max:255',
            'addresses.*.number' => 'nullable|string|max:50',
            'addresses.*.city' => 'nullable|string|max:255',
            'addresses.*.state' => 'nullable|string|max:255',
            'addresses.*.cep' => 'nullable|string|max:20',
            'addresses.*.type' => 'nullable|in:residencial,comercial,industrial,rural',
            'addresses.*.roof_type' => 'nullable|string|max:255',


            'addresses.*.energy_info' => 'nullable|array',
            'addresses.*.energy_info.average_monthly_consumption_kwh' => 'nullable|string',
            'addresses.*.energy_info.average_annual_consumption_kwh' => 'nullable|string',
            'addresses.*.energy_info.average_energy_bill' => 'nullable|string',

            'addresses.*.energy_info.energy_provider' => 'nullable|string|max:255',
            'addresses.*.energy_info.notes' => 'nullable|string',
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'document_number' => $validated['document_number'] ?? null,
        ]);

        foreach ($validated['addresses'] ?? [] as $addressData) {
            $energyInfoData = $addressData['energy_info'] ?? null;
            unset($addressData['energy_info']);

            $address = $customer->addresses()->create($addressData);

            if ($energyInfoData) {
                foreach (['average_monthly_consumption_kwh', 'average_annual_consumption_kwh', 'average_energy_bill'] as $field) {
                    if (isset($energyInfoData[$field])) {
                        $num = str_replace(',', '.', $energyInfoData[$field]);
                        $formatted = number_format((float) $num, 2, '.', '');
                        $energyInfoData[$field] = (float) $formatted;
                    }
                }
                $address->addressEnergyInfo()->create($energyInfoData);
            }

        }

        return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $customer = Customer::with(['addresses.addressEnergyInfo'])->findOrFail($id);

        return Inertia::render('Customers/Show', [
            'Customer' => $customer,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $customer = Customer::with('addresses.addressEnergyInfo')->findOrFail($id);

        return Inertia::render('Customers/Edit', [
            'Customer' => $customer,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $customer = Customer::with('addresses.addressEnergyInfo')->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'document_number' => 'nullable|string|max:50',

            'addresses' => 'nullable|array',
            'addresses.*.id' => 'nullable|integer|exists:addresses,id',
            'addresses.*.neighborhood' => 'nullable|string|max:255',
            'addresses.*.street' => 'nullable|string|max:255',
            'addresses.*.number' => 'nullable|string|max:50',
            'addresses.*.city' => 'nullable|string|max:255',
            'addresses.*.state' => 'nullable|string|max:255',
            'addresses.*.cep' => 'nullable|string|max:20',
            'addresses.*.type' => 'nullable|in:residential,industrial,commercial',

            'addresses.*.energy_info.average_monthly_consumption_kwh' => 'nullable|numeric',
            'addresses.*.energy_info.average_annual_consumption_kwh' => 'nullable|numeric',
            'addresses.*.energy_info.average_energy_bill' => 'nullable|numeric',
            'addresses.*.energy_info.energy_provider' => 'nullable|string|max:255',
            'addresses.*.energy_info.roof_type' => 'nullable|string|max:255',
            'addresses.*.energy_info.notes' => 'nullable|string',
        ]);

        $customer->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'document_type' => $validated['document_type'] ?? null,
            'document_number' => $validated['document_number'] ?? null,
        ]);

        foreach ($validated['addresses'] ?? [] as $addressData) {
            $energyInfoData = $addressData['energy_info'] ?? null;
            unset($addressData['energy_info']);

            if (isset($addressData['id'])) {
                $address = $customer->addresses()->find($addressData['id']);
                if ($address) {
                    $address->update($addressData);
                }
            } else {
                $address = $customer->addresses()->create($addressData);
            }

            if ($energyInfoData && isset($address)) {
                $energyInfo = $address->energyInfo;
                if ($energyInfo) {
                    $energyInfo->update($energyInfoData);
                } else {
                    $address->energyInfo()->create($energyInfoData);
                }
            }
        }

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }
}
