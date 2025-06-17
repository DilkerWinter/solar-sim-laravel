<?php

namespace App\DataTables;

use App\Models\Customer;

class CustomerDataTable
{
    public function getTable($params)
    {
        $perPage = data_get($params, 'perPage', 5);
        $page = data_get($params, 'page', 1);
        $searchQuery = data_get($params, 'search', '');
        $sortKey = data_get($params, 'sortKey', 'name');
        $sortOrder = data_get($params, 'sortOrder', 'asc');

        $query = Customer::with('addresses.addressEnergyInfo');

        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('name', 'ilike', '%' . $searchQuery . '%')
                    ->orWhere('email', 'ilike', '%' . $searchQuery . '%')
                    ->orWhere('document_number', 'ilike', '%' . $searchQuery . '%');
            });
        }


        if ($sortKey && in_array($sortOrder, ['asc', 'desc'])) {
            $query->orderBy($sortKey, $sortOrder);
        }

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        $formattedData = $data->getCollection()->map(function ($customer) {
            $totalConsumption = 0;
            $totalBill = 0;

            foreach ($customer->addresses as $address) {
                $info = $address->addressEnergyInfo;
                if ($info) {
                    $totalConsumption += $info->average_monthly_consumption_kwh ?? 0;
                    $totalBill += $info->average_energy_bill ?? 0;
                }
            }

            $addressTypes = $this->countAddressTypes($customer->addresses);

            return [
                'id' => $customer->id,
                'customer_info' => [$customer->name, $customer->email, $customer->phone],
                'address_info' => ['count' => $customer->addresses->count(), 'types' => $addressTypes],
                'total_consumption' => number_format($totalConsumption, 0, ',', ''),
                'total_bill' => number_format($totalBill, 2, ',', '.'),
                'actions' => $this->getActions($customer),
            ];
        });

        $headers = [
            ['key' => 'customer_info', 'label' => 'Cliente'],
            ['key' => 'address_info', 'label' => 'Endereços'],
            ['key' => 'total_consumption', 'label' => 'Consumo Total (kWh)'],
            ['key' => 'total_bill', 'label' => 'Conta Total (R$)'],
            ['key' => 'actions', 'label' => 'Ações'],
        ];


        return response()->json([
            'data' => $formattedData,
            'headers' => $headers,
            'total' => $data->total(),
            'lastPage' => $data->lastPage(),
        ]);
    }

    private function getActions($customer): array
    {
        return [
            [
                'type' => 'view',
                'id' => $customer->id,
                'icon' => 'Eye',
                'route' => route('customers.show', ['customer' => $customer->id]),
            ],
        ];
    }

    private function countAddressTypes($addresses): array
    {
        $types = [
            'residencial' => 0,
            'comercial' => 0,
            'industrial' => 0,
            'rural' => 0,
        ];

        foreach ($addresses as $address) {
            $type = strtolower($address->type);
            if (array_key_exists($type, $types)) {
                $types[$type]++;
            }
        }

        return $types;
    }
}
