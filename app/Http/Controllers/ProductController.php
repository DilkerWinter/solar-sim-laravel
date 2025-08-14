<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
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
        $products = $this->productService->getAll();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $this->productService->create($request->all());

        return redirect()
        ->route('products.index')
        ->with('success', 'Produto criado com sucesso!');
    }

    public function show(string $id)
    {
        $product = $this->productService->get($id);

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    public function edit(string $id)
    {
        $product = $this->productService->get($id);

        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $this->productService->update($request->all(), $id);

        return redirect()
        ->route('products.edit', $id)
        ->with('success', 'Produto atualizado com sucesso!');
    }

    public function destroy(string $id)
    {
        $this->productService->delete($id);

        return redirect()
            ->route('products.index')
            ->with('success', 'Produto deletado com sucesso!');
    }
}
