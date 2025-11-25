<?php

namespace Tests\Unit\Services;

use App\Services\KitService;
use App\Repositories\KitRepository;
use App\DataTables\KitDataTable;
use PHPUnit\Framework\TestCase;
use Mockery;

class KitServiceTest extends TestCase
{
    protected $kitRepository;
    protected $kitService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->kitRepository = Mockery::mock(KitRepository::class);
        $this->kitService = new KitService($this->kitRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all()
    {
        $expectedData = collect(['kit1', 'kit2']);
        
        $this->kitRepository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expectedData);

        $result = $this->kitService->getAll();

        $this->assertEquals($expectedData, $result);
    }

    public function test_get()
    {
        $id = 1;
        $expectedKit = (object)['id' => 1, 'name' => 'Kit Solar 5kW'];
        
        $this->kitRepository
            ->shouldReceive('get')
            ->once()
            ->with($id)
            ->andReturn($expectedKit);

        $result = $this->kitService->get($id);

        $this->assertEquals($expectedKit, $result);
    }

    public function test_create()
    {
        $data = ['name' => 'Kit Solar 10kW', 'price' => 15000];
        $expectedKit = (object)['id' => 1, 'name' => 'Kit Solar 10kW'];
        
        $this->kitRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($expectedKit);

        $result = $this->kitService->create($data);

        $this->assertEquals($expectedKit, $result);
    }

    public function test_update()
    {
        $id = 1;
        $data = ['name' => 'Kit Solar Atualizado'];
        $expectedKit = (object)['id' => 1, 'name' => 'Kit Solar Atualizado'];
        
        $this->kitRepository
            ->shouldReceive('update')
            ->once()
            ->with($data, $id)
            ->andReturn($expectedKit);

        $result = $this->kitService->update($data, $id);

        $this->assertEquals($expectedKit, $result);
    }

    public function test_delete()
    {
        $id = 1;
        
        $this->kitRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $result = $this->kitService->delete($id);

        $this->assertTrue($result);
    }

    public function test_count()
    {
        $expectedCount = 12;
        
        $this->kitRepository
            ->shouldReceive('count')
            ->once()
            ->andReturn($expectedCount);

        $result = $this->kitService->count();

        $this->assertEquals($expectedCount, $result);
    }
}