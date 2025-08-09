<?php

namespace App\Repositories;

use App\Models\Product;
use Exception;

class ProductRepository
{
    public function getAll()
    {
        return Product::all();
    }

    public function get($id)
    {
        return Product::find($id);
    }

    public function create($data)
    {
        try {
            $product = new Product;
            $product->fill($data);
            $product->save();
            
            return $product;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($id, $data)
    {
        try {
            $product = Product::findOrFail($id);
            $product->fill($data);
            $product->save();

            return $product;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return Product::destroy($id);
    }
}