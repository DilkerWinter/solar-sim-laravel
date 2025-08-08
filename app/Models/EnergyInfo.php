<?php

namespace App\Models;

use App\Models\Address;
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

}