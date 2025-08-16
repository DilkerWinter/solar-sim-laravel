<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Represents a product that can be used to assemble kits.
 */
class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products';

    protected $fillable = [
        'id',
        'name',
        'description',
        'price',
        'brand',
        'type_id',
    ]; 
    
    protected $with = ['solarPanel', 'inverter'];

    public function solarPanel()
    {
        return $this->hasOne(SolarPanel::class, 'product_id');
    }

    public function inverter()
    {
        return $this->hasOne(Inverter::class, 'product_id');
    }

    public function type()
    {
        return $this->hasOne(ProductType::class, 'product_id');
    }
}
