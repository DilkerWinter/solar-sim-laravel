<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        return $this->categoryService->getAll();
    }

    public function get($id)
    {
        return $this->categoryService->get($id);
    }

    public function store(Request $request)
    {
        return $this->categoryService->create($request->all());
    }

    public function destoy($id)
    {
        return $this->categoryService->delete($id);
    }
}
