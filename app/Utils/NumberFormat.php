<?php

namespace App\Utils;

class NumberFormat
{
    public function integerToDouble(int $value): string
    {
        return number_format($value / 100, 2, ',', '.');
    }
    
    public function doubleToInteger(string $value): int
    {
        $normalized = str_replace('.', '', $value);
        $normalized = str_replace(',', '.', $normalized);

        return (int) round(floatval($normalized) * 100);
    }
}