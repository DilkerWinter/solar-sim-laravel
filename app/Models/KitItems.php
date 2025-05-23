<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Relational Table to link Products to a Kit
 */
class KitItems extends Model
{
    protected $fillable = [
        'kit_id',
        'product_id',
        'quantity',
    ];

    public function product()
    {
        return $this->HasOne(Product::class);
    }
}
