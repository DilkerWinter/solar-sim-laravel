<?php

namespace App\Models;

use App\Models\Products\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class KitProducts extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kit_products';

    protected $fillable = [
        'kit_id',
        'product_id',
        'quantity',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function kit()
    {
        return $this->belongsTo(Kit::class, 'kit_id');
    }
}
