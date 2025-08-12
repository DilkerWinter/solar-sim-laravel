<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Represents the catogory of a product 
 */
class Category extends Model
{
   use HasFactory, SoftDeletes;

   protected $table = 'categories';

   protected $fillable = [
        'id',
        'name',
     ];

     public function products()
     {
        return $this->hasMany(Product::class);
     }
}
