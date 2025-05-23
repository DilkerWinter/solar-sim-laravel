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
        $customers = Customer::all();
        return Inertia::render('Customers/Index', ['Customers' => $customers]);
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
            'street' => 'nullable|string|max:255',
            'number' => 'nullable|string|max:50',
            'neighborhood' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'average_monthly_consumption_kwh' => 'nullable|numeric',
            'average_annual_consumption_kwh' => 'nullable|numeric',
            'average_energy_bill' => 'nullable|numeric',
            'energy_provider' => 'nullable|string|max:255',
            'installation_type' => 'nullable|in:residential,industrial,commercial',
            'roof_type' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        Customer::create($validated);

        return redirect()->route('Customers.index')->with('success', 'Customer created successfuly.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $customer = Customer::findOrFail($id);

        return Inertia::render('Customers/Show', props: [
            'Customer' => $customer,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $customer = Customer::findOrFail($id);

        return Inertia::render('Customers/Edit', [
            'Customer' => $customer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $customer = Customer::findOrFail($id);
        
        $validated = $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|email|max:255',
                'street' => 'nullable|string|max:255',
                'number' => 'nullable|string|max:50',
                'neighborhood' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:255',
                'state' => 'nullable|string|max:255',
                'average_monthly_consumption_kwh' => 'nullable|numeric',
                'average_annual_consumption_kwh' => 'nullable|numeric',
                'average_energy_bill' => 'nullable|numeric',
                'energy_provider' => 'nullable|string|max:255',
                'installation_type' => 'nullable|in:residential,industrial,commercial',
                'roof_type' => 'nullable|string|max:255',
                'notes' => 'nullable|string',
            ]);

        $customer::update($validated);

        return redirect()->route('Customers.index')->with('success', 'Customer updated successfuly.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->route('Customers.index')->with('success', 'Customer deleted successfully.');
    }
}
