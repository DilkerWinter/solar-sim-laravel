<?php

namespace Database\Seeders;

use App\Models\Products\Inverter;
use App\Models\Products\Product;
use App\Models\Products\SolarPanel;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory()->count(3)->create();
        Inverter::factory()->count(3)->create();
        SolarPanel::factory()->count(3)->create();
    }
}
