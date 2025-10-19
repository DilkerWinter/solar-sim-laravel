<?php

namespace App\DataTables;

use App\Models\Kit;

class KitDataTable
{
    public function getTable($params)
    {
        $perPage = data_get($params, 'perPage', 5);
        $page = data_get($params, 'page', 1);
        $searchQuery = data_get($params, 'search', '');
        $sortKey = data_get($params, 'sortKey', 'name');
        $sortOrder = data_get($params, 'sortOrder', 'asc');

        $query = Kit::with('products');

        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('name', 'ilike', '%' . $searchQuery . '%')
                    ->orWhere('description', 'ilike', '%' . $searchQuery . '%');
            });
        }

        if ($sortKey && in_array($sortOrder, ['asc', 'desc'])) {
            $query->orderBy($sortKey, $sortOrder);
        }

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        $formattedData = $data->getCollection()->map(function ($kit) {
            return [
                'id' => $kit->id,
                'name' => $kit->name,
                'total_price' => $kit->total_price_formatted,
                'generated_kw' => $kit->generated_kw_month_formatted,
                'supported_kw' => $kit->supported_kw_formatted,
                'total_potency_kw' => $kit->total_potency_kw_formatted,
                'products_count' => $kit->products->count(),
                'actions' => $this->getActions($kit),
            ];
        });

        $headers = [
            ['key' => 'name', 'label' => 'Nome'],
            ['key' => 'generated_kw', 'label' => 'Geração (kW)'],
            ['key' => 'total_potency_kw', 'label' => 'Potência Gerada (kW)'],
            ['key' => 'supported_kw', 'label' => 'Potência Suportada (kW)'],
            ['key' => 'products_count', 'label' => 'Qtd. Produtos'],
            ['key' => 'total_price', 'label' => 'Preço Total (R$)'],
            ['key' => 'actions', 'label' => 'Ações'],
        ];

        return response()->json([
            'data' => $formattedData,
            'headers' => $headers,
            'total' => $data->total(),
            'lastPage' => $data->lastPage(),
        ]);
    }

    private function getActions($kit): array
    {
        return [
            [
                'type' => 'view',
                'id' => $kit->id,
                'icon' => 'Eye',
                'route' => route('kits.show', ['kit' => $kit->id]),
            ],
        ];
    }
}
