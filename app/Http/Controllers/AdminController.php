<?php

namespace App\Http\Controllers;

use App\Services\EmployeeService;
use App\Services\EmployeeRoleService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPanelController extends Controller
{
    public function index()
    {
        try {
            return Inertia::render('AdminPanel/Index');
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar tela de admin: ' . $e->getMessage()
            ]);
        }
    }

}
