<?php
namespace App\Models\Products;

use App\Utils\NumberFormat;
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

    protected $appends = [
        'supported_panel_max_power_watts_formatted',
        'max_power_watts_formatted',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function setSupportedPanelMaxPowerWattsAttribute($value)
    {
        $this->attributes['supported_panel_max_power_watts'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function setMaxPowerWattsAttribute($value)
    {
        $this->attributes['max_power_watts'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function getSupportedPanelMaxPowerWattsFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['supported_panel_max_power_watts']);
    }

    public function getMaxPowerWattsFormattedAttribute()
    {
        return (new NumberFormat())->integerToDouble($this->attributes['max_power_watts']);
    }
}