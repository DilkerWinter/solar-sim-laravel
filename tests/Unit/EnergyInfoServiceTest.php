<?php

namespace Tests\Unit\Services;

use App\Services\EnergyInfoService;
use App\Repositories\EnergyInfoRepository;
use PHPUnit\Framework\TestCase;
use Mockery;

class EnergyInfoServiceTest extends TestCase
{
    protected $energyInfoRepository;
    protected $energyInfoService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->energyInfoRepository = Mockery::mock(EnergyInfoRepository::class);
        $this->energyInfoService = new EnergyInfoService($this->energyInfoRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all()
    {
        $expectedData = collect(['energyInfo1', 'energyInfo2']);
        
        $this->energyInfoRepository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expectedData);

        $result = $this->energyInfoService->getAll();

        $this->assertEquals($expectedData, $result);
    }

    public function test_get()
    {
        $id = 1;
        $expectedEnergyInfo = (object)['id' => 1, 'consumption' => 500];
        
        $this->energyInfoRepository
            ->shouldReceive('get')
            ->once()
            ->with($id)
            ->andReturn($expectedEnergyInfo);

        $result = $this->energyInfoService->get($id);

        $this->assertEquals($expectedEnergyInfo, $result);
    }

    public function test_create()
    {
        $data = ['address_id' => 1, 'consumption' => 500];
        $expectedEnergyInfo = (object)['id' => 1, 'consumption' => 500];
        
        $this->energyInfoRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($expectedEnergyInfo);

        $result = $this->energyInfoService->create($data);

        $this->assertEquals($expectedEnergyInfo, $result);
    }

    public function test_update()
    {
        $id = 1;
        $data = ['consumption' => 600];
        $expectedEnergyInfo = (object)['id' => 1, 'consumption' => 600];
        
        $this->energyInfoRepository
            ->shouldReceive('update')
            ->once()
            ->with($data, $id)
            ->andReturn($expectedEnergyInfo);

        $result = $this->energyInfoService->update($data, $id);

        $this->assertEquals($expectedEnergyInfo, $result);
    }

    public function test_delete()
    {
        $id = 1;
        
        $this->energyInfoRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $result = $this->energyInfoService->delete($id);

        $this->assertTrue($result);
    }
}