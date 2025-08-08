<?php

namespace App\Repositories;

use App\Models\Customer;
use Exception;

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
        try {
            $customer = new Customer;
            $customer->fill($data);
            $customer->save();

            return $customer;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($data, $id)
    {
        try {
            $customer = Customer::findOrFail($id);
            $customer->fill($data);
            $customer->save();

            return $customer;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return Customer::destroy($id);
    }

    
}