<?php

namespace Database\Factories\Products;

use App\Models\Products\Product;
use App\Models\Products\SolarPanel;
use Illuminate\Database\Eloquent\Factories\Factory;

class SolarPanelFactory extends Factory
{
    protected $model = SolarPanel::class;

    public function definition(): array
    {
        $product = Product::factory()->create([
            'type_id' => 1,
        ]);

        return [
            'product_id' => $product->id,
            'potency_watts' => $this->faker->numberBetween(100, 500),
            'efficiency_percentage' => $this->faker->numberBetween(15, 25),
            'average_daily_energy_wh' => $this->faker->numberBetween(1000, 5000),
            'max_operating_temperature' => $this->faker->numberBetween(40, 80),
            'height' => $this->faker->numberBetween(100, 200),
            'width' => $this->faker->numberBetween(50, 100),
            'weight' => $this->faker->numberBetween(10, 30),
            'operating_voltage' => $this->faker->numberBetween(30, 60),
        ];
    }
}
