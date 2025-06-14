<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    /** @test */
    public function index_displays_customers_list(): void
    {
        Customer::factory()->count(3)->create();

        $this->get(route('customers.index'))
            ->assertOk()
            ->assertInertia(
                fn(Assert $page) =>
                $page->component('Customers/Index')
                    ->has('customers', 3)
            );
    }

    /** @test */
    public function store_creates_customer_with_addresses_and_energy_info(): void
    {
        $payload = [
            'name' => 'Test Customer',
            'email' => 'test@example.com',
            'phone' => '123456789',
            'document_number' => '12345678900',
            'addresses' => [
                [
                    'neighborhood' => 'Centro',
                    'street' => 'Rua A',
                    'number' => '100',
                    'city' => 'Cidade X',
                    'state' => 'Estado Y',
                    'cep' => '12345-678',
                    'type' => 'residencial',
                    'roof_type' => 'telhado tipo A',
                    'energy_info' => [
                        'average_monthly_consumption_kwh' => '500',
                        'average_annual_consumption_kwh' => '6000',
                        'average_energy_bill' => '350',
                        'energy_provider' => 'Companhia Z',
                        'notes' => 'Consumo médio'
                    ],
                ]
            ]
        ];

        $this->post(route('customers.store'), $payload)
            ->assertRedirect(route('customers.index'));

        $this->assertDatabaseHas('customers', [
            'email' => 'test@example.com',
            'name' => 'Test Customer',
        ]);

        $this->assertDatabaseHas('addresses', [
            'street' => 'Rua A',
            'city' => 'Cidade X',
        ]);
    }

    /** @test */
    public function store_fails_without_name(): void
    {
        $this->post(route('customers.store'), [])
            ->assertSessionHasErrors(['name']);
    }

    /** @test */
    public function show_displays_customer_by_id(): void
    {
        $customer = Customer::factory()->create();

        $this->get(route('customers.show', $customer))
            ->assertOk()
            ->assertInertia(
                fn(Assert $page) =>
                $page->component('Customers/Show')
                    ->where('Customer.id', $customer->id)
            );
    }

    /** @test */
    public function update_customer_successfully(): void
    {
        $customer = Customer::factory()->create();

        $updateData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'phone' => '99999999',
            'document_number' => '11111111111',
        ];

        $this->put(route('customers.update', $customer), $updateData)
            ->assertRedirect(route('customers.index'));

        $this->assertDatabaseHas('customers', [
            'id' => $customer->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);
    }

    /** @test */
    public function destroy_deletes_customer(): void
    {
        $customer = Customer::factory()->create();

        $this->delete(route('customers.destroy', $customer))
            ->assertRedirect(route('customers.index'));

        $this->assertSoftDeleted('customers', [
            'id' => $customer->id,
        ]);
    }

}
