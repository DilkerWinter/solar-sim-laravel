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

    public function create($data)
    {
        try {
            $productType = new ProductType();
            $productType->fill($data);
            $productType->save();
            return $productType;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($data, $id)
    {
        try {
            $productType = ProductType::findOrFail($id);
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

    public function count()
    {
        return ProductType::count();
    }
}
