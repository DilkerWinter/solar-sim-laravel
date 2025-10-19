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
        'generated_kw_month',
        'total_potency_kw',
        'supported_kw',
    ];

    protected $appends = [
        'total_price_formatted',
        'total_potency_kw_formatted',
        'generated_kw_month_formatted',
        'supported_kw_formatted',
    ];

    public function kitProducts()
    {
        return $this->hasMany(KitProducts::class, 'kit_id');
    }

    public function products()
    {
        return $this->hasManyThrough(Product::class, KitProducts::class, 'kit_id', 'id', 'id', 'product_id');
    }

    public function setTotalPriceFormattedAttribute($value)
    {
        $this->attributes['total_price'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function setGeneratedKwMonthAttribute($value)
    {
        $this->attributes['generated_kw_month'] = round($value * 1000);
    }

    public function setSupportedKwAttribute($value)
    {
        $this->attributes['supported_kw'] = round($value * 1000);
    }

    public function setTotalPotencyKwAttribute($value)
    {
        $this->attributes['total_potency_kw'] = round($value * 1000);
    }


    public function getTotalPriceFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['total_price'] ?? 0);
    }

    public function getGeneratedKwMonthFormattedAttribute()
    {
        $value = $this->generated_kw_month / 1000;
        return number_format($value, 2, ',', '.');
    }

    public function getSupportedKwFormattedAttribute()
    {
        $value = $this->supported_kw / 1000;
        return number_format($value, 2, ',', '.');
    }

    public function getTotalPotencyKwFormattedAttribute()
    {
        $value = $this->total_potency_kw / 1000;
        return number_format($value, 2, ',', '.');
    }
}
