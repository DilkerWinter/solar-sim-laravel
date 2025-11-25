<?php

namespace Tests\Unit\Services;

use App\Services\CustomerService;
use App\Repositories\CustomerRepository;
use App\DataTables\CustomerDataTable;
use PHPUnit\Framework\TestCase;
use Mockery;

class CustomerServiceTest extends TestCase
{
    protected $customerRepository;
    protected $customerService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->customerRepository = Mockery::mock(CustomerRepository::class);
        $this->customerService = new CustomerService($this->customerRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all()
    {
        $expectedData = collect(['customer1', 'customer2']);
        
        $this->customerRepository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expectedData);

        $result = $this->customerService->getAll();

        $this->assertEquals($expectedData, $result);
    }

    public function test_get()
    {
        $id = 1;
        $expectedCustomer = (object)['id' => 1, 'name' => 'João Silva'];
        
        $this->customerRepository
            ->shouldReceive('get')
            ->once()
            ->with($id)
            ->andReturn($expectedCustomer);

        $result = $this->customerService->get($id);

        $this->assertEquals($expectedCustomer, $result);
    }

    public function test_create()
    {
        $data = ['name' => 'Maria Santos', 'email' => 'maria@teste.com'];
        $expectedCustomer = (object)['id' => 1, 'name' => 'Maria Santos'];
        
        $this->customerRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($expectedCustomer);

        $result = $this->customerService->create($data);

        $this->assertEquals($expectedCustomer, $result);
    }

    public function test_update()
    {
        $id = 1;
        $data = ['name' => 'João Atualizado'];
        $expectedCustomer = (object)['id' => 1, 'name' => 'João Atualizado'];
        
        $this->customerRepository
            ->shouldReceive('update')
            ->once()
            ->with($data, $id)
            ->andReturn($expectedCustomer);

        $result = $this->customerService->update($data, $id);

        $this->assertEquals($expectedCustomer, $result);
    }

    public function test_delete()
    {
        $id = 1;
        
        $this->customerRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $result = $this->customerService->delete($id);

        $this->assertTrue($result);
    }

    public function test_count()
    {
        $expectedCount = 25;
        
        $this->customerRepository
            ->shouldReceive('count')
            ->once()
            ->andReturn($expectedCount);

        $result = $this->customerService->count();

        $this->assertEquals($expectedCount, $result);
    }

    public function test_get_dashboard_customers()
    {
        $expectedCustomers = collect([
            (object)['id' => 1, 'name' => 'Cliente 1', 'addresses_count' => 2],
            (object)['id' => 2, 'name' => 'Cliente 2', 'addresses_count' => 1]
        ]);
        
        $this->customerRepository
            ->shouldReceive('getDashboardCustomers')
            ->once()
            ->andReturn($expectedCustomers);

        $result = $this->customerService->getDashboardCustomers();

        $this->assertEquals($expectedCustomers, $result);
    }
}