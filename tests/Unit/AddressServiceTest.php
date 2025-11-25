<?php

namespace Tests\Unit\Services;

use App\Services\AddressService;
use App\Repositories\AddressRepository;
use PHPUnit\Framework\TestCase;
use Mockery;

class AddressServiceTest extends TestCase
{
    protected $addressRepository;
    protected $addressService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->addressRepository = Mockery::mock(AddressRepository::class);
        $this->addressService = new AddressService($this->addressRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all()
    {
        $expectedData = collect(['address1', 'address2']);

        $this->addressRepository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expectedData);

        $result = $this->addressService->getAll();

        $this->assertEquals($expectedData, $result);
    }

    public function test_get()
    {
        $id = 1;
        $expectedAddress = (object)['id' => 1, 'street' => 'Rua Teste'];

        $this->addressRepository
            ->shouldReceive('get')
            ->once()
            ->with($id)
            ->andReturn($expectedAddress);

        $result = $this->addressService->get($id);

        $this->assertEquals($expectedAddress, $result);
    }

    public function test_create()
    {
        $data = ['street' => 'Rua Nova', 'number' => '123'];
        $expectedAddress = (object)['id' => 1, 'street' => 'Rua Nova'];

        $this->addressRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($expectedAddress);

        $result = $this->addressService->create($data);

        $this->assertEquals($expectedAddress, $result);
    }

    public function test_update()
    {
        $id = 1;
        $data = ['street' => 'Rua Atualizada'];
        $expectedAddress = (object)['id' => 1, 'street' => 'Rua Atualizada'];

        $this->addressRepository
            ->shouldReceive('update')
            ->once()
            ->with($id, $data)
            ->andReturn($expectedAddress);

        $result = $this->addressService->update($id, $data);

        $this->assertEquals($expectedAddress, $result);
    }

    public function test_delete()
    {
        $id = 1;

        $this->addressRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $result = $this->addressService->delete($id);

        $this->assertTrue($result);
    }

    public function test_count()
    {
        $expectedCount = 10;

        $this->addressRepository
            ->shouldReceive('count')
            ->once()
            ->andReturn($expectedCount);

        $result = $this->addressService->count();

        $this->assertEquals($expectedCount, $result);
    }
}
