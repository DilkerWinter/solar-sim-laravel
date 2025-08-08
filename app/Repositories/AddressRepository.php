
<?php

use App\Models\Address;

class AddressRepository
{
    public function getAll()
    {
        return Address::all();
    }

    public function get($id)
    {
        return Address::find($id);
    }

    public function create($data)
    {
        try {
            $address = new Address;
            $address->fill($data);
            $address->save();
            
            return $address;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($id, $data)
    {
        try {
            $address = Address::findOrFail($id);
            $address->fill($data);
            $address->save();

            return $address;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return Address::destroy($id);
    }
}