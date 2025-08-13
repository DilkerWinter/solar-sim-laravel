<?php

namespace App\Services;

use App\Repositories\ProductTypeRepository;

class ProductTypeService
{

    protected $productTypeRepository;

    public function __construct(ProductTypeRepository $productTypeRepository)
    {
        $this->productTypeRepository = $productTypeRepository;
    }

    public function getAll()
    {
        return $this->productTypeRepository->getAll();
    }

    public function get($id)
    {
        return $this->productTypeRepository->get($id);
    }

    public function create($data)
    {
        return $this->productTypeRepository->create($data);
    }

    public function delete($id)
    {
       return $this->productTypeRepository->delete($id);
    }
}