<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class SolarPanel extends Product
{
    use HasFactory, SoftDeletes;

    protected $table = 'solar_panels';

    protected $fillable = [
        'product_id',
        'potency_watts',
        'efficiency_percentage',
        'average_daily_energy_wh',
        'max_operating_temperature', 
        'operating_voltage',
        'height',
        'width',
        'weight',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
