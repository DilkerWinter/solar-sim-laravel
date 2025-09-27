<?php

namespace App\Models;

use App\Models\Products\Product;
use App\Utils\NumberFormat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kit extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kits';

    protected $fillable = [
        'name',
        'description',
        'total_price',
        'generated_kwh',
        'supported_kw'
    ];

    protected $appends = [
        'total_price_formatted',
    ];

    public function kitProducts()
    {
        return $this->hasMany(KitProducts::class, 'kit_id');
    }

    public function products()
    {
        return $this->hasManyThrough(Product::class, KitProducts::class, 'kit_id', 'id', 'id', 'product_id');
    }

    public function getTotalPriceFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['total_price']);
    }
}
