<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kit extends Model
{
     protected $fillable = [
        'name',
        'totalPrice',
        'maxPotencyKw',
     ];

     public function kitItems()
     {
        return $this->hasMany(KitItems::class);
     }
}
