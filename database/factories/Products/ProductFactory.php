<?php

namespace Database\Factories\Products;

use App\Enum\ProductType;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'price' => $this->faker->numberBetween(4),
            'brand' => $this->faker->word,
            'type' => fake()->randomElement(ProductType::cases())->value
        ];
    }
}
