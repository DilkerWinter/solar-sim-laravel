<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Relational Table to link Products to a Kit
 */
class KitItems extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kititems';

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
