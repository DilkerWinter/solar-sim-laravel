<?php
// database/factories/CustomerFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => $this->faker->name,
            'phone'       => $this->faker->phoneNumber,
            'email'       => $this->faker->unique()->safeEmail,
            'street'      => $this->faker->streetName,
            'number'      => $this->faker->buildingNumber,
            'neighborhood'=> $this->faker->citySuffix,
            'city'        => $this->faker->city,
            'state'       => $this->faker->stateAbbr,
            'average_monthly_consumption_kwh' => $this->faker->randomFloat(2, 100, 1000),
            'average_annual_consumption_kwh'  => $this->faker->randomFloat(2, 1200, 12000),
            'average_energy_bill'             => $this->faker->randomFloat(2, 100, 2000),
            'energy_provider'  => $this->faker->company,
            'installation_type'=> $this->faker->randomElement(['residential','commercial','industrial']),
            'roof_type'        => $this->faker->randomElement(['laje','telha cerâmica','telha metálica']),
            'notes'            => $this->faker->sentence,
        ];
    }
}
