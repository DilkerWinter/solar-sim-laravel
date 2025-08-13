<?php

namespace Database\Factories\Products;

use App\Models\Products\ProductType;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'price' => $this->faker->numberBetween(4),
            'type_id' => ProductType::whereIn('id', [1, 2, 3])->inRandomOrder()->first()->id,
        ];
    }
}
