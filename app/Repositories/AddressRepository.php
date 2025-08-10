<?php

namespace App\Repositories;

use App\Models\Address;
use App\Services\EnergyInfoService;
use Exception;
use Illuminate\Support\Facades\DB;

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
        DB::beginTransaction();
        try {
            $address = new Address;
            $address->fill($data);
            $address->save();

            if(!empty($data['energy_info'])) {
                $energyInfoService = resolve(EnergyInfoService::class);
                $energyInfo = $data['energy_info'];
                $energyInfo['address_id'] = $address->id;
                $energyInfoService->create($energyInfo);
            }

            DB::commit();
            return $address;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update($data, $id)
    {
        DB::beginTransaction();
        try {
            $address = Address::findOrFail($id);
            $address->load('energyInfo');
            $address->fill($data);
            $address->save();

            $energyInfoService = resolve(EnergyInfoService::class);

            if (!empty($data['energy_info'])) {
                $energyInfoData = $data['energy_info'];

                if ($address->energyInfo) {
                    $energyInfoService->update($energyInfoData, $address->energyInfo->id);
                } else {
                    $energyInfoData['address_id'] = $address->id;
                    $energyInfoService->create($energyInfoData);
                }
            } else {
                if ($address->energyInfo) {
                    $energyInfoService->delete($address->energyInfo->id);
                }
            }
            
            DB::commit();
            return $address;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        return Address::destroy($id);
    }

    public function count()
    {
        return Address::count();
    }
}