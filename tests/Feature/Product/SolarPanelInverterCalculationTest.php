<?php

namespace Tests\Unit;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SolarPanelInverterCalculationTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Tests if the 
     * @return void
     */
    public function test_calculate_max_panels_per_inverter()
    {

        $panelSpecs = [
            'nominalPower'         => 340,    // W
            'openCircuitVoltage'   => 46.1,   // V
            'referenceTemperature' => 25,     // °C
            'tempCoeffVoc'         => -0.0029 // ΔVoc / °C (decimal)
        ];

        $solarPanel = Product::create([
            'name'        => 'Solar Panel 340 W',
            'description' => 'Test panel',
            'price'       => 0,
            'brand'       => 'TestBrand',
            'category'    => 'solarpanel',
            'data'        => json_encode($panelSpecs),
        ]);


        $inverterSpecs = [
            'maxInputPower'     => 6500, // Wp
            'maxInputVoltage'   => 600,  // V
            'numMppts'          => 2,
            'numStringsPerMppt' => 1
        ];

        $inverter = Product::create([
            'name'        => 'Inverter 6.5 kW',
            'description' => 'Test inverter',
            'price'       => 0,
            'brand'       => 'TestBrand',
            'category'    => 'inverter',
            'data'        => json_encode($inverterSpecs),
        ]);


        $panel   = json_decode($solarPanel->data, true);
        $inv     = json_decode($inverter->data, true);
        $ambient = -5; // °C

        // Power-based limit
        $panelsByPower = $inv['maxInputPower'] / $panel['nominalPower'];

        // Temperature-corrected Voc
        $deltaT  = $ambient - $panel['referenceTemperature'];
        $factor  = 1 + ($panel['tempCoeffVoc'] * $deltaT);
        $vocCorr = $panel['openCircuitVoltage'] * $factor;

        // Voltage-based limit
        $maxPanelsPerString  = $inv['maxInputVoltage'] / $vocCorr;
        $safePanelsPerString = floor($maxPanelsPerString); // 11

        // Total per inverter
        $totalPanels         = $safePanelsPerString * $inv['numMppts'] * $inv['numStringsPerMppt']; // 22
        $totalPower          = $totalPanels * $panel['nominalPower'];                               // 7480 Wp

        if ($totalPower > $inv['maxInputPower']) {
            // Reduce by power limit
            $totalPanels = floor($panelsByPower);          // 19
            $totalPower  = $totalPanels * $panel['nominalPower']; // 6460 Wp
        }

        $this->assertEquals(19, $totalPanels,  'Max panel count per inverter');
        $this->assertLessThanOrEqual($inv['maxInputPower'], $totalPower, 'Total power within inverter limit');
    }

     public function test_total_kw_generated_by_kit_with_two_inverters()
    {
        // 1. Create the solar panel product
        $panelSpecs = [
            'nominalPower'         => 340,    // W
            'openCircuitVoltage'   => 46.1,   // V
            'referenceTemperature' => 25,     // °C
            'tempCoeffVoc'         => -0.0029 // ΔVoc / °C (decimal)
        ];

        $solarPanel = Product::create([
            'name'        => 'Solar Panel 340 W',
            'description' => 'Test panel',
            'price'       => 0,
            'brand'       => 'TestBrand',
            'category'    => 'solarpanel',
            'data'        => json_encode($panelSpecs),
        ]);

        // 2. Create the inverter product
        $inverterSpecs = [
            'maxInputPower'     => 6500, // Wp
            'maxInputVoltage'   => 600,  // V
            'numMppts'          => 2,
            'numStringsPerMppt' => 1
        ];

        $inverter = Product::create([
            'name'        => 'Inverter 6.5 kW',
            'description' => 'Test inverter',
            'price'       => 0,
            'brand'       => 'TestBrand',
            'category'    => 'inverter',
            'data'        => json_encode($inverterSpecs),
        ]);

        // 3. Decode the JSON data
        $panel = json_decode($solarPanel->data, true);
        $inv   = json_decode($inverter->data, true);

        $ambientTemperature = -5;       // °C
        $inverterCount      = 2;        // Two identical inverters

        // 4. Calculations

        // Panels per inverter power
        $panelsByPower = $inv['maxInputPower'] / $panel['nominalPower']; // ~19.1

        // Correct open circuit voltage by temperature
        $deltaT  = $ambientTemperature - $panel['referenceTemperature'];  // -30 °C
        $factor  = 1 + ($panel['tempCoeffVoc'] * $deltaT);               // 1.087
        $vocCorr = $panel['openCircuitVoltage'] * $factor;               // ~50.12 V

        // Maximum panels per string based on voltage
        $maxPanelsPerString  = $inv['maxInputVoltage'] / $vocCorr;       // ~11.97
        $safePanelsPerString = floor($maxPanelsPerString);               // 11

        // Safe total panels per inverter
        $safePanelsPerInverter = $safePanelsPerString * $inv['numMppts'] * $inv['numStringsPerMppt']; // 22

        // Safe power per inverter in Wp
        $safePowerPerInverterWp = $safePanelsPerInverter * $panel['nominalPower']; // 7480 Wp

        // Adjust if it exceeds inverter max power
        if ($safePowerPerInverterWp > $inv['maxInputPower']) {
            $safePanelsPerInverter  = floor($panelsByPower);                // 19
            $safePowerPerInverterWp = $safePanelsPerInverter * $panel['nominalPower']; // 6460 Wp
        }

        // Totals for the kit with two inverters
        $totalPanels  = $safePanelsPerInverter * $inverterCount;          // 19 × 2 = 38
        $totalPowerWp = $safePowerPerInverterWp * $inverterCount;         // 12,920 Wp
        $totalPowerKw = $totalPowerWp / 1000;                             // 12.92 kW

        // 5. Assertions
        $this->assertEquals(38, $totalPanels,      'Total panel count');
        $this->assertEquals(12920, $totalPowerWp,  'Total power (Wp)');
        $this->assertEqualsWithDelta(12.92, $totalPowerKw, 0.001, 'Total power (kW)');
    }
}
