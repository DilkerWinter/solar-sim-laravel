<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use App\Services\ProductTypeService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }
    
    public function index()
    {
        try {
            $products = $this->productService->getAll();

            return Inertia::render('Products/Index', [
                'products' => $products,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar produtos: ' . $e->getMessage()
            ]);
        }
    }

    public function create()
    {
        try {
            $productTypeService = resolve(ProductTypeService::class);
            $productTypes = $productTypeService->getAll();

            return Inertia::render('Products/Create', [
                'productTypes' => $productTypes
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao abrir formulário de produtos: ' . $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $this->productService->create($request->all());

            return redirect()->route('products.index')->with('toast', [
                'type' => 'success',
                'message' => 'Produto criado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao criar produto: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function show(string $id)
    {
        try {
            $product = $this->productService->get($id);

            return Inertia::render('Products/Show', [
                'product' => $product,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar produto: ' . $e->getMessage()
            ]);
        }
    }

    public function edit(string $id)
    {
        try {
            $product = $this->productService->get($id);

            return Inertia::render('Products/Edit', [
                'product' => $product,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao editar produto: ' . $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $this->productService->update($request->all(), $id);

            return redirect()->route('products.edit', $id)->with('toast', [
                'type' => 'success',
                'message' => 'Produto atualizado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao atualizar produto: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->productService->delete($id);

            return redirect()->route('products.index')->with('toast', [
                'type' => 'success',
                'message' => 'Produto deletado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao deletar produto: ' . $e->getMessage()
            ]);
        }
    }

    
    public function count(Request $request)
    {
        try {
            $type = $request->input('type');
        
            return $this->productService->count($type);
            
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao contar produtos: ' . $e->getMessage()
            ], 500);
        }
    }

}
