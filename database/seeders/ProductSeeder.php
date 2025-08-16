<?php

namespace Database\Seeders;

use App\Models\Products\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory()->count(10)->create();
    }
}
