<?php

namespace App\DataTables;

use App\Models\Products\Product;
use App\Utils\NumberFormat;

class ProductDataTable
{
    public function getTable($params)
    {
        $perPage = data_get($params, 'perPage', 5);
        $page = data_get($params, 'page', 1);
        $searchQuery = data_get($params, 'search', '');
        $sortKey = data_get($params, 'sortKey', 'name');
        $sortOrder = data_get($params, 'sortOrder', 'asc');
        $typeId = data_get($params, 'type');

        $query = Product::with('type')
            ->orderBy($sortKey, $sortOrder);

        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('name', 'ilike', '%' . $searchQuery . '%')
                    ->orWhere('brand', 'ilike', '%' . $searchQuery . '%');
            });
        }
        
        if (!empty($typeId)) {
            $query->where('product_type_id', $typeId);
        }

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        $formattedData = $data->getCollection()->map(function ($product) {
            $numberFormat = new NumberFormat();

            return [
                'id'    => $product->id,
                'name'  => $product->name,
                'brand' => $product->brand,
                'price' => $numberFormat->integerToDouble($product->price),
                'type'  => $product->type ? $product->type->name : null,
                'actions' => $this->getActions($product),
            ];
        });

        $headers = [
            ['key' => 'name', 'label' => 'Nome'],
            ['key' => 'brand', 'label' => 'Marca'],
            ['key' => 'type', 'label' => 'Categoria'],
            ['key' => 'price', 'label' => 'Preço'],
            ['key' => 'actions', 'label' => 'Ações'],
        ];

        return response()->json([
            'data' => $formattedData,
            'headers' => $headers,
            'total' => $data->total(),
            'lastPage' => $data->lastPage(),
        ]);
    }

    private function getActions($product): array
    {
        return [
            [
                'type' => 'view',
                'id' => $product->id,
                'icon' => 'Eye',
                'route' => route('products.show', ['product' => $product->id]),
            ],
        ];
    }
}
