<?php

namespace App\Services;

use App\Repositories\EnergyInfoRepository;

class EnergyInfoService
{

    protected $energyInfoRepository;

    public function __construct(EnergyInfoRepository $energyInfoRepository)
    {
        $this->energyInfoRepository = $energyInfoRepository;
    }

    public function getAll()
    {
        return $this->energyInfoRepository->getAll();
    }

    public function get($id)
    {
        return $this->energyInfoRepository->get($id);
    }

    public function create($data)
    {
        return $this->energyInfoRepository->create($data);
    }

    public function update($data, $id)
    {
        return $this->energyInfoRepository->update($data, $id);
    }

    public function delete($id)
    {
       return $this->energyInfoRepository->delete($id);
    }
}