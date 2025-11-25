<?php

namespace Tests\Unit\Services;

use App\Services\EmployeeService;
use App\Repositories\EmployeeRepository;
use App\DataTables\EmployeeDataTable;
use PHPUnit\Framework\TestCase;
use Mockery;

class EmployeeServiceTest extends TestCase
{
    protected $employeeRepository;
    protected $employeeService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->employeeRepository = Mockery::mock(EmployeeRepository::class);
        $this->employeeService = new EmployeeService($this->employeeRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all()
    {
        $expectedData = collect(['employee1', 'employee2']);
        
        $this->employeeRepository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expectedData);

        $result = $this->employeeService->getAll();

        $this->assertEquals($expectedData, $result);
    }

    public function test_get()
    {
        $id = 1;
        $expectedEmployee = (object)['id' => 1, 'name' => 'Carlos Silva'];
        
        $this->employeeRepository
            ->shouldReceive('get')
            ->once()
            ->with($id)
            ->andReturn($expectedEmployee);

        $result = $this->employeeService->get($id);

        $this->assertEquals($expectedEmployee, $result);
    }

    public function test_create()
    {
        $data = ['name' => 'Pedro Santos', 'email' => 'pedro@teste.com'];
        $expectedEmployee = (object)['id' => 1, 'name' => 'Pedro Santos'];
        
        $this->employeeRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($expectedEmployee);

        $result = $this->employeeService->create($data);

        $this->assertEquals($expectedEmployee, $result);
    }

    public function test_update()
    {
        $id = 1;
        $data = ['name' => 'Carlos Atualizado'];
        $expectedEmployee = (object)['id' => 1, 'name' => 'Carlos Atualizado'];
        
        $this->employeeRepository
            ->shouldReceive('update')
            ->once()
            ->with($data, $id)
            ->andReturn($expectedEmployee);

        $result = $this->employeeService->update($data, $id);

        $this->assertEquals($expectedEmployee, $result);
    }

    public function test_delete()
    {
        $id = 1;
        
        $this->employeeRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $result = $this->employeeService->delete($id);

        $this->assertTrue($result);
    }

    public function test_count_without_role()
    {
        $expectedCount = 15;
        
        $this->employeeRepository
            ->shouldReceive('count')
            ->once()
            ->with(null)
            ->andReturn($expectedCount);

        $result = $this->employeeService->count();

        $this->assertEquals($expectedCount, $result);
    }

    public function test_count_with_role()
    {
        $role = 'manager';
        $expectedCount = 5;
        
        $this->employeeRepository
            ->shouldReceive('count')
            ->once()
            ->with($role)
            ->andReturn($expectedCount);

        $result = $this->employeeService->count($role);

        $this->assertEquals($expectedCount, $result);
    }

    public function test_reset_password()
    {
        $id = 1;
        $expectedResult = true;
        
        $this->employeeRepository
            ->shouldReceive('resetPassword')
            ->once()
            ->with($id)
            ->andReturn($expectedResult);

        $result = $this->employeeService->resetPassword($id);

        $this->assertTrue($result);
    }
}