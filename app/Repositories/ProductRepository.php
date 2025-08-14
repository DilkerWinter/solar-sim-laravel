<?php

namespace App\Repositories;

use App\Enum\ProductType;
use App\Models\Products\Inverter;
use App\Models\Products\Product;
use App\Models\Products\SolarPanel;
use Exception;

class ProductRepository
{
    public function getAll()
    {
        return Product::all();
    }

    public function get($id)
    {
        return Product::find($id);
    }

    public function create($data)
    {
        try {
            $product = new Product;
            $product->fill($data);
            $product->save();

            switch ($data['type']) {
                case ProductType::SOLARPANEL->value:
                    if(!empty($data['solar_panel'])) {
                        $solarPanel = $data['solar_panel'];
                        $solarPanel['product_id'] = $product->id;
                        SolarPanel::create($solarPanel);
                    }
                break;

                case ProductType::INVERTER->value:
                    if(!empty($data['inverter'])) {
                        $inverter = $data['inverter'];
                        $inverter['product_id'] = $product->id;
                        Inverter::create($inverter);
                    }
                break;

                default:
                break;
            }

            return $product;

        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($data, $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->fill($data);
            $product->save();

            return $product;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return Product::destroy($id);
    }
}