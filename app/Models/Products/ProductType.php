<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Represents the type of a product
 */
class ProductType extends Model
{
   use HasFactory, SoftDeletes;

   protected $table = 'product_types';

   protected $fillable = [
        'id',
        'name',
     ];

}
