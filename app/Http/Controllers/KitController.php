<?php

namespace App\Http\Controllers;

use App\Services\KitService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KitController extends Controller
{
    protected $kitService;

    public function __construct(KitService $kitService)
    {
        $this->kitService = $kitService;
    }
    
    public function index()
    {
        try {
            return Inertia::render('Kits/Index', [route('kits.index')]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar kits: ' . $e->getMessage()
            ]);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Kits/Create');
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao abrir formulário de kits: ' . $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $this->kitService->create($request->all());

            return redirect()->route('kits.index')->with('toast', [
                'type' => 'success',
                'message' => 'Kit criado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao criar kit: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function show(string $id)
    {
        try {
            $kit = $this->kitService->get($id);

            return Inertia::render('Kits/Show', [
                'kit' => $kit,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar kit: ' . $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $this->kitService->update($request->all(), $id);

            return redirect()->route('kits.show', $id)->with('toast', [
                'type' => 'success',
                'message' => 'Kit atualizado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao atualizar kit: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->kitService->delete($id);

            return redirect()->route('kits.index')->with('toast', [
                'type' => 'success',
                'message' => 'Kit deletado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao deletar kit: ' . $e->getMessage()
            ]);
        }
    }
}
