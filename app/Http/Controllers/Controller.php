<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
    public function jsonRequest(Request $request) 
    {
        return ($request->has('jsonRequest') || $request->input('jsonRequest') === true);
    }

    public function requisicaoWithDataTable(Request $request)
    {
        return ($request->has('withDataTable') || $request->input('withDataTable') === true);
    }
}