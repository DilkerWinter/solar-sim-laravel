<?php

namespace App\DataTables;

use App\Models\Proposal;

class ProposalDataTable
{
    public function getTable($params)
    {
        $perPage = data_get($params, 'perPage', 5);
        $page = data_get($params, 'page', 1);
        $searchQuery = data_get($params, 'search', '');
        $statusFilter = data_get($params, 'status');
        $sortKey = data_get($params, 'sortKey', 'customer.name');
        $sortOrder = data_get($params, 'sortOrder', 'asc');

        $query = Proposal::with(['customer', 'kit']);

        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->whereHas('customer', function ($subQuery) use ($searchQuery) {
                    $subQuery->where('name', 'ilike', '%' . $searchQuery . '%');
                })->orWhereHas('kit', function ($subQuery) use ($searchQuery) {
                    $subQuery->where('name', 'ilike', '%' . $searchQuery . '%');
                });
            });
        }

        if ($statusFilter) {
            $query->where('status', $statusFilter);
        }


        $data = $query->paginate($perPage, ['*'], 'page', $page);

        $formattedData = $data->getCollection()->map(function ($proposal) {
            return [
                'id' => $proposal->id,
                'name' => optional($proposal->customer)->name,
                'kit' => [
                    'name' => optional($proposal->kit)->name,
                ],
                'final_price' => number_format($proposal->final_price / 100, 2, ',', '.'),
                'status' => $proposal->status,
                'actions' => $this->getActions($proposal),
            ];
        });

        $headers = [
            ['key' => 'name', 'label' => 'Cliente'],
            ['key' => 'kit', 'label' => 'Kit Escolhido'],
            ['key' => 'final_price', 'label' => 'Preço'],
            ['key' => 'status', 'label' => 'Status'],
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
                'type' => 'pending',
                'id' => $proposal->id,
                'icon' => 'Clock',
                'route' => route('proposals.pending', ['proposal' => $proposal->id]),
                'method' => 'POST',
            ],
            [
                'type' => 'approve',
                'id' => $proposal->id,
                'icon' => 'CheckCircle',
                'route' => route('proposals.approve', ['proposal' => $proposal->id]),
                'method' => 'POST',
            ],
            [
                'type' => 'reject',
                'id' => $proposal->id,
                'icon' => 'XCircle',
                'route' => route('proposals.reject', ['proposal' => $proposal->id]),
                'method' => 'POST',
            ],
            [
                'type' => 'download_pdf',
                'id' => $proposal->id,
                'icon' => 'FileText',
                'route' => null,
                'method' => null,
            ],
        ];
    }
}
