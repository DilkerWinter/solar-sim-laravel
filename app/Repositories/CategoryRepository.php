<?php

namespace App\Repositories;

use App\Models\Category;
use Exception;

class CategoryRepository
{
    public function getAll()
    {
        return Category::all();
    }

    public function get($id)
    {
        return Category::find($id);
    }

    public function create($data)
    {
        try {
            $category = new Category;
            $category->fill($data);
            $category->save();
            
            return $category;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return Category::destroy($id);
    }
}