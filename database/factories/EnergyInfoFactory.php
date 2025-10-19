<?php

namespace Database\Factories;

use App\Models\EnergyInfo;
use Illuminate\Database\Eloquent\Factories\Factory;

class EnergyInfoFactory extends Factory
{
    protected $model = EnergyInfo::class;

    public function definition(): array
    {
        return [
            'average_annual_consumption_kwh' => $this->faker->numberBetween(100, 1000),
            'average_energy_bill'            => $this->faker->numberBetween(100, 1000),
            'energy_provider'                 => $this->faker->company,
            'notes'                           => $this->faker->sentence,
        ];
    }
}
