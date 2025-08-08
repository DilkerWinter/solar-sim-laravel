<?php

namespace App\Service;

use EnergyInfoRepository;

class AddressService
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

    public function update($id, $data)
    {
        return $this->energyInfoRepository->update($id, $data);
    }

    public function delete($id)
    {
       return $this->energyInfoRepository->delete($id);
    }
}