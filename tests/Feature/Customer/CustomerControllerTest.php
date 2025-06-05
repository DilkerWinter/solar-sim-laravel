<?php
namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
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
             ->assertInertia(fn (Assert $page) =>
                 $page->component('Customers/Index')
                      ->has('customers', 3)
             );
    }

    /** @test */
    public function store_creates_customer_with_valid_data(): void
    {
        $payload = Customer::factory()->make()->toArray();

        $this->post(route('customers.store'), $payload)
             ->assertRedirect(route('customers.index'));

        $this->assertDatabaseHas('customers', [
            'email' => $payload['email'],
            'name'  => $payload['name'],
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
             ->assertInertia(fn (Assert $page) =>
                 $page->component('Customers/Show')
                      ->where('Customer.id', $customer->id)
             );
    }

    /** @test */
    public function update_customer_successfully(): void
    {
        $customer = Customer::factory()->create();
        $newData = ['name' => 'Updated Customer'];

        $this->put(route('customers.update', $customer), $newData + $customer->toArray())
             ->assertRedirect(route('customers.index'));

        $this->assertDatabaseHas('customers', [
            'id'   => $customer->id,
            'name' => 'Updated Customer',
        ]);
    }

    /** @test */
    public function destroy_deletes_customer(): void
    {
        $customer = Customer::factory()->create();

        $this->delete(route('customers.destroy', $customer))
             ->assertRedirect(route('customers.index'));

        $this->assertDatabaseMissing('customers', ['id' => $customer->id]);
    }
}
