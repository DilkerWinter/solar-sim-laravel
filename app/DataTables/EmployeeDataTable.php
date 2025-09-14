<?php

namespace App\DataTables;

use App\Models\User;

class EmployeeDataTable
{
    public function getTable($params)
    {
        $perPage = data_get($params, 'perPage', 5);
        $page = data_get($params, 'page', 1);
        $searchQuery = data_get($params, 'search', '');
        $sortKey = data_get($params, 'sortKey', 'name');
        $sortOrder = data_get($params, 'sortOrder', 'asc');

        $query = User::query();

        if ($searchQuery) {
            $query->where('name', 'ilike', '%' . $searchQuery . '%');
        }

        if ($sortKey && in_array($sortOrder, ['asc', 'desc'])) {
            $query->orderBy($sortKey, $sortOrder);
        }

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        $formattedData = $data->getCollection()->map(function ($employee) {
            return [
                'id' => $employee->id,
                'name' => $employee->name,
                'email' => $employee->email,
                'role' => $employee->role,
                'actions' => $this->getActions($employee),
            ];
        });

        $headers = [
            ['key' => 'name', 'label' => 'Nome'],
            ['key' => 'email', 'label' => 'Email'],
            ['key' => 'role', 'label' => 'Cargo'],
            ['key' => 'actions', 'label' => 'Ações'],
        ];

        return response()->json([
            'data' => $formattedData,
            'headers' => $headers,
            'total' => $data->total(),
            'lastPage' => $data->lastPage(),
        ]);
    }

    private function getActions($employee): array
    {
        return [
            [
                'type' => 'view',
                'id' => $employee->id,
                'icon' => 'UserPen',
                'route' => route('employees.show', ['employee' => $employee->id]),
            ],
            [
                'type' => 'delete',
                'id' => $employee->id,
                'icon' => 'Trash',
                'route' => route('employees.destroy', ['employee' => $employee->id]),
            ],

        ];
    }
}
