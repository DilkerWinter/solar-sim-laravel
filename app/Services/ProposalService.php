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

    public function count()
    {
        return $this->proposalRepository->count();
    }

    public function getDataTable($filters) 
    {
        $dataTable = resolve(ProposalDataTable::class);
        return $dataTable->getTable($filters);
    }

    public function countOpen()
    {
        return $this->proposalRepository->countOpen();
    }

    public function countClosed()
    {
        return $this->proposalRepository->countClosed();
    }
}
