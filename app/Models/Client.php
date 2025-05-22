<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'nome',
        'telefone',
        'email',
        'rua',
        'numero',
        'bairro',
        'cidade',
        'estado',
        'consumo_medio_mensal_kwh',
        'consumo_medio_anual_kwh',
        'valor_medio_conta',
        'distribuidora',
        'tipo_instalacao',
        'tipo_telhado',
        'observacoes'
    ];
}
