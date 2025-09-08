<?php
namespace App\Models\Products;

use App\Utils\NumberFormat;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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

    protected $appends = [
        'potency_watts_formatted',
        'efficiency_percentage_formatted',
        'average_daily_energy_wh_formatted',
        'max_operating_temperature_formatted',
        'height_formatted',
        'width_formatted',
        'weight_formatted',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function setPotencyWattsAttribute($value)
    {
        $this->attributes['potency_watts'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function setEfficiencyPercentageAttribute($value)
    {
        $this->attributes['efficiency_percentage'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function setAverageDailyEnergyWhAttribute($value)
    {
        $this->attributes['average_daily_energy_wh'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function setMaxOperatingTemperatureAttribute($value)
    {
        $this->attributes['max_operating_temperature'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function setHeightAttribute($value)
    {
        $this->attributes['height'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function setWidthAttribute($value)
    {
        $this->attributes['width'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function setWeightAttribute($value)
    {
        $this->attributes['weight'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function getPotencyWattsFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['potency_watts']);
    }

    public function getEfficiencyPercentageFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['efficiency_percentage']);
    }

    public function getAverageDailyEnergyWhFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['average_daily_energy_wh']);
    }

    public function getMaxOperatingTemperatureFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['max_operating_temperature']);
    }

    public function getHeightFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['height']);
    }

    public function getWidthFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['width']);
    }

    public function getWeightFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['weight']);
    }
}