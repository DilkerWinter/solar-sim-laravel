<?php

namespace Tests\Unit\Services;

use App\Services\ProductService;
use App\Repositories\ProductRepository;
use App\DataTables\ProductDataTable;
use PHPUnit\Framework\TestCase;
use Mockery;

class ProductServiceTest extends TestCase
{
    protected $productRepository;
    protected $productService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->productRepository = Mockery::mock(ProductRepository::class);
        $this->productService = new ProductService($this->productRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all()
    {
        $expectedData = collect(['product1', 'product2']);
        
        $this->productRepository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expectedData);

        $result = $this->productService->getAll();

        $this->assertEquals($expectedData, $result);
    }

    public function test_get()
    {
        $id = 1;
        $expectedProduct = (object)['id' => 1, 'name' => 'Painel Solar 550W'];
        
        $this->productRepository
            ->shouldReceive('get')
            ->once()
            ->with($id)
            ->andReturn($expectedProduct);

        $result = $this->productService->get($id);

        $this->assertEquals($expectedProduct, $result);
    }

    public function test_create()
    {
        $data = ['name' => 'Inversor 10kW', 'type' => 'inverter'];
        $expectedProduct = (object)['id' => 1, 'name' => 'Inversor 10kW'];
        
        $this->productRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($expectedProduct);

        $result = $this->productService->create($data);

        $this->assertEquals($expectedProduct, $result);
    }

    public function test_update()
    {
        $id = 1;
        $data = ['name' => 'Painel Atualizado'];
        $expectedProduct = (object)['id' => 1, 'name' => 'Painel Atualizado'];
        
        $this->productRepository
            ->shouldReceive('update')
            ->once()
            ->with($data, $id)
            ->andReturn($expectedProduct);

        $result = $this->productService->update($data, $id);

        $this->assertEquals($expectedProduct, $result);
    }

    public function test_delete()
    {
        $id = 1;
        
        $this->productRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $result = $this->productService->delete($id);

        $this->assertTrue($result);
    }

    public function test_count()
    {
        $type = 'panel';
        $expectedCount = 20;
        
        $this->productRepository
            ->shouldReceive('count')
            ->once()
            ->with($type)
            ->andReturn($expectedCount);

        $result = $this->productService->count($type);

        $this->assertEquals($expectedCount, $result);
    }

    public function test_get_all_grouped_by_type()
    {
        $expectedGrouped = [
            'panel' => collect(['product1', 'product2']),
            'inverter' => collect(['product3'])
        ];
        
        $this->productRepository
            ->shouldReceive('getAllGroupedByType')
            ->once()
            ->andReturn($expectedGrouped);

        $result = $this->productService->getAllGroupedByType();

        $this->assertEquals($expectedGrouped, $result);
    }
}