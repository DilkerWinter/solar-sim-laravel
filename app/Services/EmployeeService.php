<?php

namespace App\Services;

use App\Repositories\EmployeeRepository;
use App\DataTables\EmployeeDataTable;

class EmployeeService
{
    protected $employeeRepository;

    public function __construct(EmployeeRepository $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }

    public function getAll()
    {
        return $this->employeeRepository->getAll();
    }

    public function get($id)
    {
        return $this->employeeRepository->get($id);
    }

    public function create($data)
    {
        return $this->employeeRepository->create($data);
    }

    public function update($data, $id)
    {
        return $this->employeeRepository->update($data, $id);
    }

    public function delete($id)
    {
        return $this->employeeRepository->delete($id);
    }

    public function count($role = null)
    {
        return $this->employeeRepository->count($role);
    }

    // public function getDataTable($filters)
    // {
    //     $dataTable = resolve(EmployeeDataTable::class);
    //     return $dataTable->getTable($filters);
    // }
}
