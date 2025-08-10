<?php

namespace App\Repositories;

use App\Models\Customer;
use App\Services\AddressService;
use Exception;
use Illuminate\Support\Facades\DB;

class CustomerRepository
{
    public function getAll()
    {
        return Customer::all();
    }

    public function get($id)
    {
        return Customer::with('addresses.energyInfo')->find($id);
    }

    public function create($data)
    {
        DB::beginTransaction();
        try {
            
            $customer = new Customer;
            $customer->fill($data);
            $customer->save();

            foreach ($data['addresses'] as $address) {
                $addressService = resolve(AddressService::class);
                $address['customer_id'] = $customer->id;
                $addressService->create($address);
            }

            DB::commit();
            return $customer;

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update($data, $id)
    {
        DB::beginTransaction();
        try {
            $customer = Customer::findOrFail($id);

            $customerData = $data;
            unset($customerData['addresses']);

            $customer->fill($customerData);
            $customer->save();

            $receivedAddressIds = collect($data['addresses'])->pluck('id')->filter()->all();
            $existingAddressIds = $customer->addresses()->pluck('id')->all();
            $toDelete = array_diff($existingAddressIds, $receivedAddressIds);

            $addressService = resolve(AddressService::class);

            if (!empty($toDelete)) {
                foreach ($toDelete as $deleteId) {
                    $addressService->delete($deleteId);
                }
            }

            foreach ($data['addresses'] as $address) {
                $addressService = resolve(AddressService::class);
                $address['customer_id'] = $customer->id;

                if (isset($address['id'])) {
                    $addressService->update($address, $address['id']);
                } else {
                    $addressService->create($address);
                }
            }

            DB::commit();
            return $customer;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        return Customer::destroy($id);
    }

    public function count()
    {
        return Customer::count();
    }
}