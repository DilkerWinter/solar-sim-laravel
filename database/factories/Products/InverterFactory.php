<?php

namespace Database\Factories\Products;

use App\Models\Products\Inverter;
use App\Models\Products\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class InverterFactory extends Factory
{
    protected $model = Inverter::class;

    public function definition(): array
    {
        $product = Product::factory()->create([
            'type_id' => 2,
        ]);

        return [
            'product_id' => $product->id,
            'type' => $this->faker->randomElement(['Microinversor', 'Bifásico', 'Trifásico', 'Hibrido']),
            'supported_panel_max_power_watts' => $this->faker->numberBetween(100, 500),
            'max_power_watts' => $this->faker->numberBetween(500, 5000),
            'operating_voltage' => $this->faker->numberBetween(200, 600),
        ];
    }
}
