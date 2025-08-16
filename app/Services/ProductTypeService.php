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

    public function create($data)
    {
        return $this->productTypeRepository->create($data);
    }

    public function update($data, $id)
    {
        return $this->productTypeRepository->update($data, $id);
    }

    public function delete($id)
    {
       return $this->productTypeRepository->delete($id);
    }
}
