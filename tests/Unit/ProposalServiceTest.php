<?php

namespace Tests\Unit\Services;

use App\Services\ProposalService;
use App\Repositories\ProposalRepository;
use App\DataTables\ProposalDataTable;
use Barryvdh\DomPDF\Facade\Pdf;
use PHPUnit\Framework\TestCase;
use Mockery;

class ProposalServiceTest extends TestCase
{
    protected $proposalRepository;
    protected $proposalService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->proposalRepository = Mockery::mock(ProposalRepository::class);
        $this->proposalService = new ProposalService($this->proposalRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all()
    {
        $expectedData = collect(['proposal1', 'proposal2']);
        
        $this->proposalRepository
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expectedData);

        $result = $this->proposalService->getAll();

        $this->assertEquals($expectedData, $result);
    }

    public function test_get()
    {
        $id = 1;
        $expectedProposal = (object)['id' => 1, 'status' => 'pending'];
        
        $this->proposalRepository
            ->shouldReceive('get')
            ->once()
            ->with($id)
            ->andReturn($expectedProposal);

        $result = $this->proposalService->get($id);

        $this->assertEquals($expectedProposal, $result);
    }

    public function test_create()
    {
        $data = ['customer_id' => 1, 'status' => 'pending'];
        $expectedProposal = (object)['id' => 1, 'status' => 'pending'];
        
        $this->proposalRepository
            ->shouldReceive('create')
            ->once()
            ->with($data)
            ->andReturn($expectedProposal);

        $result = $this->proposalService->create($data);

        $this->assertEquals($expectedProposal, $result);
    }

    public function test_update()
    {
        $id = 1;
        $data = ['status' => 'approved'];
        $expectedProposal = (object)['id' => 1, 'status' => 'approved'];
        
        $this->proposalRepository
            ->shouldReceive('update')
            ->once()
            ->with($data, $id)
            ->andReturn($expectedProposal);

        $result = $this->proposalService->update($data, $id);

        $this->assertEquals($expectedProposal, $result);
    }

    public function test_delete()
    {
        $id = 1;
        
        $this->proposalRepository
            ->shouldReceive('delete')
            ->once()
            ->with($id)
            ->andReturn(true);

        $result = $this->proposalService->delete($id);

        $this->assertTrue($result);
    }

    public function test_count_by_status()
    {
        $status = 'approved';
        $expectedCount = 15;
        
        $this->proposalRepository
            ->shouldReceive('countByStatus')
            ->once()
            ->with($status)
            ->andReturn($expectedCount);

        $result = $this->proposalService->countByStatus($status);

        $this->assertEquals($expectedCount, $result);
    }

    public function test_pending_proposal()
    {
        $data = ['proposal' => 1];
        $expectedProposal = (object)['id' => 1, 'status' => 'pending'];
        
        $this->proposalRepository
            ->shouldReceive('pendingProposal')
            ->once()
            ->with($data['proposal'])
            ->andReturn($expectedProposal);

        $result = $this->proposalService->pendingProposal($data);

        $this->assertEquals($expectedProposal, $result);
    }

    public function test_approve_proposal()
    {
        $data = ['proposal' => 1];
        $expectedProposal = (object)['id' => 1, 'status' => 'approved'];
        
        $this->proposalRepository
            ->shouldReceive('approveProposal')
            ->once()
            ->with($data['proposal'])
            ->andReturn($expectedProposal);

        $result = $this->proposalService->approveProposal($data);

        $this->assertEquals($expectedProposal, $result);
    }

    public function test_reject_proposal()
    {
        $data = ['proposal' => 1];
        $expectedProposal = (object)['id' => 1, 'status' => 'rejected'];
        
        $this->proposalRepository
            ->shouldReceive('rejectProposal')
            ->once()
            ->with($data['proposal'])
            ->andReturn($expectedProposal);

        $result = $this->proposalService->rejectProposal($data);

        $this->assertEquals($expectedProposal, $result);
    }

    public function test_grouped_by_status()
    {
        $expectedGrouped = [
            'pending' => 10,
            'approved' => 25,
            'rejected' => 5
        ];
        
        $this->proposalRepository
            ->shouldReceive('groupedByStatus')
            ->once()
            ->andReturn($expectedGrouped);

        $result = $this->proposalService->groupedByStatus();

        $this->assertEquals($expectedGrouped, $result);
    }

    public function test_count()
    {
        $expectedCount = 40;
        
        $this->proposalRepository
            ->shouldReceive('count')
            ->once()
            ->andReturn($expectedCount);

        $result = $this->proposalService->count();

        $this->assertEquals($expectedCount, $result);
    }
}