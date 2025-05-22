<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
        return Inertia::render('Clients/Index', ['clients' => $clients]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Clients/Create');
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

        Client::create($validated);

        return redirect()->route('clients.index')->with('success', 'Client created successfuly.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Client::findOrFail($id);

        return Inertia::render('Clients/Show', props: [
            'client' => $client,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $client = Client::findOrFail($id);

        return Inertia::render('Clients/Edit', [
            'client' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $client = Client::findOrFail($id);
        
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

        $client::update($validated);

        return redirect()->route('clients.index')->with('success', 'Client updated successfuly.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        return redirect()->route('clients.index')->with('success', 'Client deleted successfully.');
    }
}
