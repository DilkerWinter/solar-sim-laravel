<?php

namespace App\Http\Controllers;

use App\Services\ProductTypeService;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    protected $productTypeService;

    public function __construct(ProductTypeService $productTypeService)
    {
        $this->productTypeService = $productTypeService;
    }

    public function index()
    {
        return $this->productTypeService->getAll();
    }

    public function get($id)
    {
        return $this->productTypeService->get($id);
    }

    public function store(Request $request)
    {
        return $this->productTypeService->create($request->all());
    }

    public function destoy($id)
    {
        return $this->productTypeService->delete($id);
    }
}
