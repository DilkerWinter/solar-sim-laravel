<?php

namespace App\Repositories;

use App\Models\Kit;
use Exception;

class KitRepository
{
    public function getAll()
    {
        return Kit::all();
    }

    public function get($id)
    {
        return Kit::find($id);
    }

    public function create($data)
    {
        try {
            $kit = new Kit;
            $kit->fill($data);
            $kit->save();
            return $kit;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($data, $id)
    {
        try {
            $kit = Kit::findOrFail($id);
            $kit->fill($data);
            $kit->save();
            return $kit;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return Kit::destroy($id);
    }
}