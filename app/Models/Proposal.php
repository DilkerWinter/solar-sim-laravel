<?php

namespace App\Models;

use App\Utils\NumberFormat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Proposal extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'proposals';

    const STATUS_PENDING = 'Pendente';
    const STATUS_APPROVED = 'Aprovada';
    const STATUS_REJECTED = 'Rejeitada';

    protected $fillable = [
        'kit_id',
        'customer_id',
        'address_id',
        'final_price',
        'status',
        'observation',
        'estimated_annual_consumption_kwh',
        'estimated_monthly_bill',
        'generated_kwh',
        'supported_kw',
    ];

    public function kit()
    {
        return $this->belongsTo(Kit::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function setFinalPriceAttribute($value)
    {
        $this->attributes['final_price'] = (new NumberFormat())->doubleToInteger($value);
    }
}
