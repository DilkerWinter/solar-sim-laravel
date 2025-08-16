<?php

namespace App\Repositories;

use App\Models\Products\ProductType;
use Exception;

class ProductTypeRepository
{
    public function getAll()
    {
        return ProductType::all();
    }

    public function get($id)
    {
        return ProductType::find($id);
    }

    public function create($data)
    {
        try {
            $productType = new ProductType;
            $productType->fill($data);
            $productType->save();
            
            return $productType;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return ProductType::destroy($id);
    }
}