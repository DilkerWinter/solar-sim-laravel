<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Address;
use App\Models\AddressEnergyInfo;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'name'            => $this->faker->name,
            'phone'           => $this->faker->numerify('(##) 9####-####'),
            'email'           => $this->faker->unique()->safeEmail,
            'document_number' => $this->faker->numerify('###.###.###-##'),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Customer $customer) {
            Address::factory()
                ->count(rand(0, 4))
                ->for($customer)
                ->create()
                ->each(function (Address $address) {
                    if (rand(0, 1) === 1) {
                        AddressEnergyInfo::factory()->for($address)->create();
                    }
                });
        });
    }
}
