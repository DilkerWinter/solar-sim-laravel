<?php

namespace App\Repositories;

use App\Enum\ProductType;
use App\Models\Products\Inverter;
use App\Models\Products\Product;
use App\Models\Products\ProductType as ProductsProductType;
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

            $productType = ProductsProductType::find($data['type_id']);

            if (!$productType) {
                throw new Exception("Tipo de produto inválido.", 500);
            }
            if(!empty($data['extra_product'])) {
                switch (($productType->name)) {
                    case 'Placa Solar':
                            $solarPanel = new SolarPanel;
                            $solarPanel->fill($data['extra_product']);
                            $solarPanel->product_id = $product->id;
                            $solarPanel->save();
                    break;

                    case 'Inversor':
                            $inverter = new Inverter;
                            $inverter->fill($data['extra_product']);
                            $inverter->product_id = $product->id;
                            $inverter->save();
                    break;

                    default:
                    break;
                }
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
            
            if (!empty($data['solar_panel'])) {
                $solarData = $data['solar_panel'];
                $product->solarPanel->update($solarData);
            }
            if (!empty($data['inverter'])) {
                $inverterData = $data['inverter'];
                $product->inverter->update($inverterData);
            }


            return $product;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return Product::destroy($id);
    }

    public function count($type = null)
    {
        $query = Product::query();
    
        if (!is_null($type)) {
            $query->whereHas('type', function ($q) use ($type) {
                $q->where('name', $type);
            });
        }
    
        return $query->count();
    }


}