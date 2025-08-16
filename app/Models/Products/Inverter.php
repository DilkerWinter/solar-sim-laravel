<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inverter extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'inverters';

    protected $fillable = [
        'product_id',
        'type',
        'supported_panel_count',
        'supported_panel_max_power_watts',
        'max_power_watts',
        'operating_voltage',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
