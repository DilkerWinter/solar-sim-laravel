<?php

namespace App\Enum;

enum ProductType: string
{
    case SOLARPANEL = 'Painel Solar';
    case INVERTER = 'Inversor';
    case CABO = 'Cabo';
    case CONECTORMC4 = 'ConectorMc4';
}
