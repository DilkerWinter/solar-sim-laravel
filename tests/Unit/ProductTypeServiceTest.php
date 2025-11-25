<?php

namespace Tests\Unit\Services;

use App\Services\ProductTypeService;
use App\Repositories\ProductTypeRepository;
use PHPUnit\Framework\TestCase;
use Mockery;

class ProductTypeServiceTest extends TestCase
{
    protected $productTypeRepository;
    protected $productTypeService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->productTypeRepository = Mockery::mock(ProductTypeRepository::class);
        $this->productTypeService = new ProductTypeService($this->productTypeRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all()
    {
        $expectedData = collect(['type1', 'type2']);
        
        $this->productTypeRepository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expectedData);

        $result = $this->productTypeService->getAll();

        $this->assertEquals($expectedData, $result);
    }

    public function test_create()
    {
        $data = ['name' => 'Inversor', 'description' => 'Equipamento conversor'];
        $expectedType = (object)['id' => 1, 'name' => 'Inversor'];
        
        $this->productTypeRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($expectedType);

        $result = $this->productTypeService->create($data);

        $this->assertEquals($expectedType, $result);
    }

    public function test_update()
    {
        $id = 1;
        $data = ['name' => 'Painel Solar'];
        $expectedType = (object)['id' => 1, 'name' => 'Painel Solar'];
        
        $this->productTypeRepository
            ->shouldReceive('update')
            ->once()
            ->with($data, $id)
            ->andReturn($expectedType);

        $result = $this->productTypeService->update($data, $id);

        $this->assertEquals($expectedType, $result);
    }

    public function test_delete()
    {
        $id = 1;
        
        $this->productTypeRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $result = $this->productTypeService->delete($id);

        $this->assertTrue($result);
    }

    public function test_count()
    {
        $expectedCount = 8;
        
        $this->productTypeRepository
            ->shouldReceive('count')
            ->once()
            ->andReturn($expectedCount);

        $result = $this->productTypeService->count();

        $this->assertEquals($expectedCount, $result);
    }
}