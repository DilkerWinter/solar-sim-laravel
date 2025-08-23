<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Products\ProductType;

class ProductTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            'Placa Solar',
            'Inversor',
            'Conector MC4',
            'Suporte de Placa Solar',
            'Cabo',
            'Outro',
        ];

        foreach ($types as $type) {
            ProductType::firstOrCreate(['name' => $type]);
        }
    }
}
