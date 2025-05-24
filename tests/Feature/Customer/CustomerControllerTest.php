<?php
namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function index_mostra_lista_de_clientes(): void
    {
        Customer::factory()->count(3)->create();

        $this->get(route('customers.index'))
             ->assertOk()
             ->assertInertia(fn (Assert $page) =>
                 $page->component('Customers/Index')
                      ->has('Customers', 3)
             );
    }

    /** @test */
    public function store_cria_cliente_com_dados_validos(): void
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
    public function store_falha_se_name_ausente(): void
    {
        $this->post(route('customers.store'), [])
             ->assertSessionHasErrors(['name']);
    }

    /** @test */
    public function show_exibe_cliente_especifico(): void
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
    public function update_atualiza_cliente(): void
    {
        $customer = Customer::factory()->create();
        $novosDados = ['name' => 'Cliente Atualizado'];

        $this->put(route('customers.update', $customer), $novosDados + $customer->toArray())
             ->assertRedirect(route('customers.index'));

        $this->assertDatabaseHas('customers', [
            'id'   => $customer->id,
            'name' => 'Cliente Atualizado',
        ]);
    }

    /** @test */
    public function destroy_remove_cliente(): void
    {
        $customer = Customer::factory()->create();

        $this->delete(route('customers.destroy', $customer))
             ->assertRedirect(route('customers.index'));

        $this->assertDatabaseMissing('customers', ['id' => $customer->id]);
    }
}
