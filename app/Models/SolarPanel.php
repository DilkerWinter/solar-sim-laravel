<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class SolarPanel extends Product
{
   use HasFactory, SoftDeletes;

   protected $table = 'solar_panels';

   protected $fillable = [
        'id',
     ];

}
