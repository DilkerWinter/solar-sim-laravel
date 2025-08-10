<?php

namespace App\Models;

use App\Models\Address;
use App\Utils\NumberFormat;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class EnergyInfo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table='energy_infos';

    protected $fillable = [
        'address_id',
        'average_monthly_consumption_kwh',
        'average_annual_consumption_kwh',
        'average_energy_bill',
        'energy_provider',
        'notes'
    ];

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    protected $appends = [
        'average_monthly_consumption_kwh_formatted',
        'average_annual_consumption_kwh_formatted',
        'average_energy_bill_formatted',
    ];

    public function setAverageMonthlyConsumptionKwhAttribute($value)
    {
        $this->attributes['average_monthly_consumption_kwh'] = (new NumberFormat)->doubleToInteger($value);
    }

    public function setAverageAnnualConsumptionKwhAttribute($value)
    {
        $this->attributes['average_annual_consumption_kwh'] = (new NumberFormat)->doubleToInteger($value);
    }

    public function setAverageEnergyBillAttribute($value)
    {
        $this->attributes['average_energy_bill'] = (new NumberFormat())->doubleToInteger($value);
    }

    public function getAverageMonthlyConsumptionKwhFormattedAttribute()
    {
        return (new NumberFormat)->integerToDouble($this->attributes['average_monthly_consumption_kwh']);
    }

    public function getAverageAnnualConsumptionKwhFormattedAttribute()
    {
        return (new NumberFormat)->integerToDouble($this->attributes['average_annual_consumption_kwh']);
    }

    public function getAverageEnergyBillFormattedAttribute()
    {
        return (new NumberFormat)->integerToDouble($this->attributes['average_energy_bill']);
    }

}