<?php

namespace App\Models;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AddressEnergyInfo extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'address_id',
        'average_monthly_consumption_kwh',
        'average_annual_consumption_kwh',
        'average_energy_bill',
        'energy_provider',
        'installation_type',
        'roof_type',
        'notes'
    ];

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

}