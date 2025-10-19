<?php

namespace App\DataTables;

use App\Models\Products\ProductType;

class ProductTypeDataTable
{
    public function getTable($params)
    {
        $perPage = data_get($params, 'perPage', 5);
        $page = data_get($params, 'page', 1);
        $searchQuery = data_get($params, 'search', '');
        $sortKey = data_get($params, 'sortKey', 'name');
        $sortOrder = data_get($params, 'sortOrder', 'asc');

        $query = ProductType::query();

        if ($searchQuery) {
            $query->where('name', 'ilike', '%' . $searchQuery . '%');
        }

        if ($sortKey && in_array($sortOrder, ['asc', 'desc'])) {
            $query->orderBy($sortKey, $sortOrder);
        }

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        $formattedData = $data->getCollection()->map(function ($productType) {
            return [
                'id' => $productType->id,
                'name' => $productType->name,
                'actions' => $this->getActions($productType),
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

    private function getActions($productType): array
    {
        return [
            [
                'type' => 'edit',
                'id' => $productType->id,
                'icon' => 'Pencil',
                'route' => route('product-types.update', ['product_type' => $productType->id]),
                'method' => 'PUT', 
            ],
            [
                'type' => 'delete',
                'id' => $productType->id,
                'icon' => 'Trash2',
                'route' => route('product-types.destroy', ['product_type' => $productType->id]), 
                'method' => 'DELETE',
            ],
        ];
    }
}
