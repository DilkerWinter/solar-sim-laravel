<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Represents a product that can be used to assemble kits.
 */
class Product extends Model
{
   use HasFactory, SoftDeletes;
   protected $fillable = [
        'id',
        'name',
        'description',
        'price',
        'brand',
        'category', //Category of product (e.g., solar panel, inverter, cable)
        'data' // Additional product attributes in JSON
     ];

}
