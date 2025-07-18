<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Relational Table to link Products to a Kit
 */
class KitItems extends Model
{
    use HasFactory;
    protected $fillable = [
        'kit_id',
        'product_id',
        'quantity',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
