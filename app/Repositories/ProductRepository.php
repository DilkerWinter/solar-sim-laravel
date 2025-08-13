<?php

namespace App\Repositories;

use App\Models\Products\Product;
use Exception;

class ProductRepository
{
    public function getAll()
    {
        dd(Product::get()->first()->toArray());
        return Product::all();
    }

    public function get($id)
    {
        return Product::find($id);
    }

    //TODO: Finish function based on wich one of the type or inherited objects is
    public function create($data)
    {
        try {
            $product = new Product;
            

            $product->save();
            
            return $product;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($data, $id)
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