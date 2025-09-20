<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;

class AdminPanelController extends Controller
{
    public function index()
    {
        try {
            return Inertia::render('AdminPanel/Index', [
                'productTypeDataTableUrl' => route('product-types.dataTable')
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar tela de admin: ' . $e->getMessage()
            ]);
        }
    }
}