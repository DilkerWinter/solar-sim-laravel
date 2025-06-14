<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kit extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'total_price',
        'max_potency_kw',
    ];

    public function kitItems()
    {
        return $this->hasMany(KitItems::class);
    }

}
