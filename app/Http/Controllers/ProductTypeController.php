<?php

namespace App\Http\Controllers;

use App\DataTables\ProductTypeDataTable;
use Illuminate\Http\Request;
use App\Services\ProductTypeService;
use Exception;

class ProductTypeController extends Controller
{
    protected $productTypeService;

    public function __construct(ProductTypeService $productTypeService)
    {
        $this->productTypeService = $productTypeService;
    }

    public function index()
    {
        $productTypes = $this->productTypeService->getAll();
        return response()->json($productTypes);
    }

    public function store(Request $request)
    {
        $productType = $this->productTypeService->create($request->all());
        return response()->json($productType, 200);
    }

    public function update(Request $request, string $id)
    {
        $productType = $this->productTypeService->update($request->all(), $id);
        return response()->json($productType);
    }

    public function destroy(string $id)
    {
        $this->productTypeService->delete($id);
        return response()->json(null, 200);
    }

    public function count()
    {
        try {
            return $this->productTypeService->count();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao contar produtos: ' . $e->getMessage()
            ], 500);
        }
    }

    public function dataTable(Request $request)
    {
        try {
            $productTypeDataTable = resolve(ProductTypeDataTable::class);
            return $productTypeDataTable->getTable($request->all());
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao buscar dados: ' . $e->getMessage()
            ], 500);
        }
    }
}
