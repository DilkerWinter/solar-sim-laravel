<?php

namespace Database\Factories\Products;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductTypeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
        ];
    }
}
