<?php

namespace App\Repositories;

use App\Models\Kit;
use App\Models\KitProducts;
use Exception;
use Illuminate\Support\Facades\DB;

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
            DB::beginTransaction();

            $kit = new Kit;
            $kit->fill($data);
            $kit->save();

            foreach ($data['selectedProducts'] as $product) {
                KitProducts::create([
                    'kit_id' => $kit->id,
                    'product_id' => $product['id'],
                    'quantity' => $product['quantity']
                ]);
            }

            DB::commit();

            return $kit;

        } catch (Exception $e) {
            DB::rollBack();
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