<?php

namespace App\Http\Controllers;

use App\Models\Kit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\KitPowerCalculatorService;

class KitController extends Controller
{
    protected $calculator;

    public function __construct(KitPowerCalculatorService $calculator)
    {
        $this->calculator = $calculator;
    }

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

        $kit = Kit::create($validated);

        // Optionally calculate power after creation if kit items exist
        $this->calculator->calculateAndSetTotalPower($kit);

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

        // Recalculate totalKw after update
        $this->calculator->calculateAndSetTotalPower($kit);

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
