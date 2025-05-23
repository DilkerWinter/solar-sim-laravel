<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'street',
        'number',
        'neighborhood',
        'city',
        'state',
        'average_monthly_consumption_kwh',
        'average_annual_consumption_kwh',
        'average_energy_bill',
        'energy_provider',
        'installation_type',
        'roof_type',
        'notes'
    ];
}
