<?php

namespace App\Services;

use App\DataTables\KitDataTable;
use App\Repositories\KitRepository;

class KitService
{
    protected $kitRepository;

    public function __construct(KitRepository $kitRepository)
    {
        $this->kitRepository = $kitRepository;
    }

    public function getAll()
    {
        return $this->kitRepository->getAll();
    }

    public function get($id)
    {
        return $this->kitRepository->get($id);
    }

    public function create($data)
    {
        return $this->kitRepository->create($data);
    }

    public function update($data, $id)
    {
        return $this->kitRepository->update($data, $id);
    }

    public function delete($id)
    {
        return $this->kitRepository->delete($id);
    }

    public function count()
    {
        return $this->kitRepository->count();
    }

    public function getDataTable($filters)
    {
        $dataTable = resolve(KitDataTable::class);
        return $dataTable->getTable($filters);
    }
}