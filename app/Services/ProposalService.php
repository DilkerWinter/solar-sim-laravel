<?php

namespace App\Services;

use App\Repositories\ProposalRepository;

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
}
