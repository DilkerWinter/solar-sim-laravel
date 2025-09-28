<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Services\KitService;
use App\Services\ProductService;
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
    
    public function index(Request $request)
    {
        try {
            if ($this->requisicaoWithDataTable($request)) {
                return $this->kitService->getDataTable($request->all());
            }

            return Inertia::render('Kits/Index', [
                'kitDataTableUrl' => route('kits.index')
            ]);
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
            $productService = resolve(ProductService::class);
            $products = $productService->getAllGroupedByType();

            return Inertia::render('Kits/Create', [
                'products' => $products
            ]);
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

    public function show(Request $request, string $id)
    {
        try {
            $kit = $this->kitService->get($id);

            if($this->jsonRequest($request)) {
                return $kit;
            }

            $productService = resolve(ProductService::class);
            $products = $productService->getAllGroupedByType();

            return Inertia::render('Kits/Show', [
                'kit' => $kit,
                'products' => $products,
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

    public function count()
    {
        try {
            return $this->kitService->count();
            
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao contar kits: ' . $e->getMessage()
            ], 500);
        }
    }

    private function requisicaoWithDataTable(Request $request)
    {
        return $request->ajax() && (
            $request->has('page') ||
            $request->has('perPage') ||
            $request->has('search') ||
            $request->has('sortKey')
        );
    }
}