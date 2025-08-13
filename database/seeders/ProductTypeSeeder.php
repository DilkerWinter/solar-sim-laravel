<?php

namespace Database\Seeders;

use App\Models\Products\ProductType;
use Illuminate\Database\Seeder;

class ProductTypeSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Cabo',
            'ConectorMc4',
            'Suporte de placa solar',
            'Painel Solar',
            'Inversor',
        ];

        foreach ($categories as $name) {
            ProductType::firstOrCreate(['name' => $name]);
        }
    }
}
