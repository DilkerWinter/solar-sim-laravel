<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Represents a product type that can be used to link products.
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
