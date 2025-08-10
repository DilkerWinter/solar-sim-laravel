<?php

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    protected $model = Address::class;

    public function definition(): array
    {
        return [
            'type'         => $this->faker->randomElement(['residencial', 'comercial', 'industrial', 'rural']),
            'roof_type'    => $this->faker->randomElement(['laje', 'telha cerâmica', 'telha metálica']),
            'neighborhood' => $this->faker->citySuffix,
            'street'       => $this->faker->streetName,
            'number'       => $this->faker->buildingNumber,
            'city'         => $this->faker->city,
            'state'        => $this->faker->stateAbbr,
            'cep'          => $this->faker->postcode,
        ];
    }
}
