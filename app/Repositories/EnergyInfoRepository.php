<?php

namespace App\Repositories;

use App\Models\EnergyInfo;
use Exception;

class EnergyInfoRepository
{
    public function getAll()
    {
        return EnergyInfo::all();
    }

    public function get($id)
    {
        return EnergyInfo::find($id);
    }

    public function create($data)
    {
        try {
            $energyInfo = new EnergyInfo;
            $energyInfo->fill($data);
            $energyInfo->save();
            
            return $energyInfo;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($id, $data)
    {
        try {
            $energyInfo = EnergyInfo::findOrFail($id);
            $energyInfo->fill($data);
            $energyInfo->save();

            return $energyInfo;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return EnergyInfo::destroy($id);
    }
}