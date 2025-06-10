<?php
namespace App\Services;

use App\Models\Kit;

class KitPowerCalculatorService
{
    public function calculateAndSetTotalPower(Kit $kit, float $ambientTemp = -5): float
    {
        if (!$kit->relationLoaded('kitItems')) {
            $kit->load('kitItems');
        }

        $inverter = null;
        $solarPanel = null;

        foreach ($kit->kitItems as $kitItem) {
            $product = $kitItem->product;
            if ($product->category === 'inverter') {
                $inverter = $product;
            } elseif ($product->category === 'solarpanel') {
                $solarPanel = $product;
            }
        }

        if (!$inverter || !$solarPanel) {
            throw new \Exception("Kit must contain both a solar panel and an inverter");
        }

        $dataInverter = json_decode($inverter->data, true);
        $dataPanel = json_decode($solarPanel->data, true);


        $maxInputPower = $dataInverter['Pinmax'];
        $maxInputVoltage = $dataInverter['Vinmax'];
        $numMPPTs = $dataInverter['MPPTs'];
        $numStringsPerMPPT = $dataInverter['StringsPorMPPT'];

        $nominalPower = $dataPanel['Pmax'];
        $openCircuitVoltage = $dataPanel['Voc'];
        $referenceTemp = $dataPanel['STC'];
        $tempCoefficient = $dataPanel['TcVoc'];

        $maxPanelsByPower = intdiv($maxInputPower, $nominalPower);

        $deltaTemp = $ambientTemp - $referenceTemp;
        $correctionFactor = 1 + ($tempCoefficient * $deltaTemp);

        $correctedVoltage = $openCircuitVoltage * $correctionFactor;

        $maxPanelsPerString = floor($maxInputVoltage / $correctedVoltage);

        $totalMaxPanelsByVoltage = $maxPanelsPerString * $numMPPTs * $numStringsPerMPPT;

        $totalPowerMaxPanels = $totalMaxPanelsByVoltage * $nominalPower;

        $panelsToUse = ($totalPowerMaxPanels > $maxInputPower) ? $maxPanelsByPower : $totalMaxPanelsByVoltage;

        $finalTotalPower = $panelsToUse * $nominalPower;

        $kit->max_potency_kw = $finalTotalPower / 1000;
        $kit->save();

        return $kit->max_potency_kw;
    }
}

