<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'addresses';

    protected $fillable = [
        'customer_id',
        'type',
        'neighborhood',
        'street',
        'number',
        'city',
        'state',
        'cep'
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function addressEnergyInfo(): HasOne
    {
        return $this->hasOne(AddressEnergyInfo::class);
    }
}
