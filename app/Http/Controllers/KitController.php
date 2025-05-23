<?php

namespace App\Http\Controllers;

use App\Models\Kit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KitController extends Controller
{
    public function index()
    {
        return Inertia::render('Kits/Index', [
            'kits' => Kit::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Kits/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'totalPrice'   => 'required|numeric|min:0',
            'maxPotencyKw' => 'required|numeric|min:0',
        ]);

        Kit::create($validated);

        return redirect()
            ->route('kits.index')
            ->with('success', 'Kit created successfully!');
    }

    public function show(Kit $kit)
    {
        return Inertia::render('Kits/Show', [
            'kit' => $kit,
        ]);
    }

    public function edit(Kit $kit)
    {
        return Inertia::render('Kits/Edit', [
            'kit' => $kit,
        ]);
    }

    public function update(Request $request, Kit $kit)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'totalPrice'   => 'required|numeric|min:0',
            'maxPotencyKw' => 'required|numeric|min:0',
        ]);

        $kit->update($validated);

        return redirect()
            ->route('kits.index')
            ->with('success', 'Kit updated successfully!');
    }

    public function destroy(Kit $kit)
    {
        $kit->delete();

        return redirect()
            ->route('kits.index')
            ->with('success', 'Kit deleted successfully!');
    }
}
