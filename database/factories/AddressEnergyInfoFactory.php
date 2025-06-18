<?php

namespace Database\Factories;

use App\Models\AddressEnergyInfo;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressEnergyInfoFactory extends Factory
{
    protected $model = AddressEnergyInfo::class;

    public function definition(): array
    {
        return [
            'average_monthly_consumption_kwh' => $this->faker->randomFloat(2, 100, 1000),
            'average_annual_consumption_kwh'  => $this->faker->randomFloat(2, 1200, 12000),
            'average_energy_bill'             => $this->faker->randomFloat(2, 100, 2000),
            'energy_provider'                 => $this->faker->company,
            'notes'                           => $this->faker->sentence,
        ];
    }
}
