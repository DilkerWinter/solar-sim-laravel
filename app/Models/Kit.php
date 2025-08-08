<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kit extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kits';

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
