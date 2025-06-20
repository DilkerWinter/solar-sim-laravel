<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Represents a product that can be used to assemble kits.
 */
class Product extends Model
{
   use HasFactory;
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
