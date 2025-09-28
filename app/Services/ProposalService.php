<?php

namespace App\Services;

use App\Repositories\ProposalRepository;
use App\DataTables\ProposalDataTable;

class ProposalService
{
    protected $proposalRepository;

    public function __construct(ProposalRepository $proposalRepository)
    {
        $this->proposalRepository = $proposalRepository;
    }

    public function getAll()
    {
        return $this->proposalRepository->getAll();
    }

    public function get($id)
    {
        return $this->proposalRepository->get($id);
    }

    public function create($data)
    {
        return $this->proposalRepository->create($data);
    }

    public function update($data, $id)
    {
        return $this->proposalRepository->update($data, $id);
    }

    public function delete($id)
    {
       return $this->proposalRepository->delete($id);
    }

    public function getDataTable($filters) 
    {
        $dataTable = resolve(ProposalDataTable::class);
        return $dataTable->getTable($filters);
    }

    public function countByStatus($status)
    {
        return $this->proposalRepository->countByStatus($status);
    }

    public function pendingProposal($data)
    {
        return $this->proposalRepository->pendingProposal($data['proposal']);
    }

    public function approveProposal($data)
    {
        return $this->proposalRepository->approveProposal($data['proposal']);
    }

    public function rejectProposal($data)
    {
        return $this->proposalRepository->rejectProposal($data['proposal']);
    }
}
