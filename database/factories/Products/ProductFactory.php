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
            'brand' => $this->faker->word,
            'type_id' => ProductType::query()
                ->orderBy('id')
                ->limit(3)
                ->inRandomOrder()
                ->value('id'),
        ];
    }
}
