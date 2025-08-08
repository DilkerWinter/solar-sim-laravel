<?php

namespace App\Service;

use AddressRepository;

class AddressService
{

    protected $addressRepository;

    public function __construct(AddressRepository $addressRepository)
    {
        $this->addressRepository = $addressRepository;
    }

    public function getAll()
    {
        return $this->addressRepository->getAll();
    }

    public function get($id)
    {
        return $this->addressRepository->get($id);
    }

    public function create($data)
    {
        return $this->addressRepository->create($data);
    }

    public function update($id, $data)
    {
        return $this->addressRepository->update($id, $data);
    }

    public function delete($id)
    {
       return $this->addressRepository->delete($id);
    }
}