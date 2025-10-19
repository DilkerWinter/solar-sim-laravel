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
            'price' => $this->faker->numberBetween(100, 10000),
            'brand' => $this->faker->word,
            'type_id' => ProductType::query()
                ->where('id', '>', 2)
                ->inRandomOrder()
                ->value('id'),
        ];
    }
}
