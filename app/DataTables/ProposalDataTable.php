<?php

namespace App\DataTables;

use App\Models\Proposals\Proposal;

class ProposalDataTable
{
    public function getTable($params)
    {
        $perPage = data_get($params, 'perPage', 5);
        $page = data_get($params, 'page', 1);
        $searchQuery = data_get($params, 'search', '');
        $sortKey = data_get($params, 'sortKey', 'name');
        $sortOrder = data_get($params, 'sortOrder', 'asc');

        $query = Proposal::query();

        if ($searchQuery) {
            $query->where('name', 'ilike', '%' . $searchQuery . '%');
        }

        if ($sortKey && in_array($sortOrder, ['asc', 'desc'])) {
            $query->orderBy($sortKey, $sortOrder);
        }

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        $formattedData = $data->getCollection()->map(function ($proposal) {
            return [
                'id' => $proposal->id,
                'name' => $proposal->name,
                'actions' => $this->getActions($proposal),
            ];
        });

        $headers = [
            ['key' => 'name', 'label' => 'Nome'],
            ['key' => 'actions', 'label' => 'Ações'],
        ];

        return response()->json([
            'data' => $formattedData,
            'headers' => $headers,
            'total' => $data->total(),
            'lastPage' => $data->lastPage(),
        ]);
    }

    private function getActions($proposal): array
    {
        return [
            [
                'type' => 'edit',
                'id' => $proposal->id,
                'icon' => 'Pencil',
                'route' => route('proposals.update', ['proposal' => $proposal->id]),
                'method' => 'PUT', 
            ],
            [
                'type' => 'delete',
                'id' => $proposal->id,
                'icon' => 'Trash2',
                'route' => route('proposals.destroy', ['proposal' => $proposal->id]), 
                'method' => 'DELETE',
            ],
        ];
    }
}
