<?php

namespace App\Services;

use App\Repositories\ProductRepository;

class ProductService
{

    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAll()
    {
        return $this->productRepository->getAll();
    }

    public function get($id)
    {
        return $this->productRepository->get($id);
    }

    public function create($data)
    {
        return $this->productRepository->create($data);
    }

    public function update($data, $id)
    {
        return $this->productRepository->update($data, $id);
    }

    public function delete($id)
    {
       return $this->productRepository->delete($id);
    }

    public function count($type)
    {
        return $this->productRepository->count($type);
    }
}