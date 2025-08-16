<?php

namespace App\Services;

use App\DataTables\CustomerDataTable;
use App\Repositories\CustomerRepository;

class CustomerService
{

    protected $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function getAll()
    {
        return $this->customerRepository->getAll();
    }

    public function get($id)
    {
        return $this->customerRepository->get($id);
    }

    public function create($data)
    {
        return $this->customerRepository->create($data);
    }

    public function update($data, $id)
    {
        return $this->customerRepository->update($data, $id);
    }

    public function delete($id)
    {
       return $this->customerRepository->delete($id);
    }

    public function getDataTable($filters) 
    {
        $dataTable = resolve(CustomerDataTable::class);
        return $dataTable->getTable($filters);
    }

    public function count()
    {
        return $this->customerRepository->count();
    }
}