<?php

namespace App\Services;

use App\Repositories\CategoryRepository;

class CategoryService
{

    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAll()
    {
        return $this->categoryRepository->getAll();
    }

    public function get($id)
    {
        return $this->categoryRepository->get($id);
    }

    public function create($data)
    {
        return $this->categoryRepository->create($data);
    }

    public function delete($id)
    {
       return $this->categoryRepository->delete($id);
    }
}