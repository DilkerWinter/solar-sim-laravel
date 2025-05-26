<?php

namespace Tests\Unit\Services;

use App\Models\Kit;
use App\Models\KitItems;
use App\Models\Product;
use App\Services\KitPowerCalculatorService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KitPowerCalculatorServiceTest extends TestCase
{
    use RefreshDatabase;

    protected KitPowerCalculatorService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new KitPowerCalculatorService();
    }

    public function test_calculate_and_set_total_power_success()
    {
        $inverter = Product::create([
            'name' => 'Inverter X1',
            'description' => 'High efficiency inverter',
            'price' => 1200.00,
            'brand' => 'BrandX',
            'category' => 'inverter',
            'data' => json_encode([
                'Pinmax' => 6500,
                'Vinmax' => 600,
                'MPPTs' => 2,
                'StringsPorMPPT' => 1,
            ]),
        ]);

        $solarPanel = Product::create([
            'name' => 'Solar Panel Y1',
            'description' => 'Monocrystalline solar panel',
            'price' => 800.00,
            'brand' => 'BrandY',
            'category' => 'solarpanel',
            'data' => json_encode([
                'Pmax' => 340,
                'Voc' => 46.1,
                'STC' => 25,
                'TcVoc' => -0.0029,
            ]),
        ]);

        $kit = Kit::create([
            'name' => 'Complete Solar Kit',
            'description' => 'Kit for residential installation',
            'maxPotencyKw' => 0,
            'totalPrice' => 0,
        ]);

        KitItems::create([
            'kit_id' => $kit->id,
            'product_id' => $inverter->id,
            'quantity' => 1,
        ]);

        KitItems::create([
            'kit_id' => $kit->id,
            'product_id' => $solarPanel->id,
            'quantity' => 1,
        ]);

        $resultKw = $this->service->calculateAndSetTotalPower($kit, -5);

        $this->assertIsFloat($resultKw);
        $this->assertEqualsWithDelta(6.46, $resultKw, 0.01);

        $kit->refresh();
        $this->assertEquals($resultKw, $kit->maxPotencyKw);
    }

    public function test_calculate_throws_exception_if_inverter_missing()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("Kit must contain both a solar panel and an inverter");

        $solarPanel = Product::create([
            'name' => 'Solar Panel Y1',
            'description' => 'Monocrystalline solar panel',
            'price' => 800.00,
            'brand' => 'BrandY',
            'category' => 'solarpanel',
            'data' => json_encode([
                'Pmax' => 340,
                'Voc' => 46.1,
                'STC' => 25,
                'TcVoc' => -0.0029,
            ]),
        ]);

        $kit = Kit::create([
            'name' => 'Kit Without Inverter',
            'description' => 'Test without inverter',
            'totalPrice' => 0,
            'maxPotencyKw' => 0,
        ]);

        KitItems::create([
            'kit_id' => $kit->id,
            'product_id' => $solarPanel->id,
            'quantity' => 1,
        ]);

        $this->service->calculateAndSetTotalPower($kit);
    }

    public function test_calculate_throws_exception_if_solar_panel_missing()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("Kit must contain both a solar panel and an inverter");

        $inverter = Product::create([
            'name' => 'Inverter X1',
            'description' => 'High efficiency inverter',
            'price' => 1200.00,
            'brand' => 'BrandX',
            'category' => 'inverter',
            'data' => json_encode([
                'Pinmax' => 6500,
                'Vinmax' => 600,
                'MPPTs' => 2,
                'StringsPorMPPT' => 1,
            ]),
        ]);

        $kit = Kit::create([
            'name' => 'Kit Without Solar Panel',
            'description' => 'Test without solar panel',
            'totalPrice' => 0,
            'maxPotencyKw' => 0,
        ]);

        KitItems::create([
            'kit_id' => $kit->id,
            'product_id' => $inverter->id,
            'quantity' => 1,
        ]);

        $this->service->calculateAndSetTotalPower($kit);
    }
}
