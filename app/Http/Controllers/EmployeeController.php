<?php

namespace App\Http\Controllers;

use App\Services\EmployeeService;
use App\Services\EmployeeRoleService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }
    
    public function index()
    {
        try {
            return Inertia::render('Employees/Index', [
                'employeeDataTableUrl' => route('employees.dataTable')
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar funcionarios: ' . $e->getMessage()
            ]);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Employees/Create');
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao abrir formulário de funcionários: ' . $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $this->employeeService->create($request->all());

            return redirect()->route('employees.index')->with('toast', [
                'type' => 'success',
                'message' => 'Funcionário criado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao criar funcionário: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function show(string $id)
    {
        try {
            $employee = $this->employeeService->get($id);

            return Inertia::render('Employees/Show', [
                'employee' => $employee,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar funcionário: ' . $e->getMessage()
            ]);
        }
    }

    public function edit(string $id)
    {
        try {
            $employee = $this->employeeService->get($id);

            return Inertia::render('Employees/Edit', [
                'employee' => $employee,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao editar funcionário: ' . $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $this->employeeService->update($request->all(), $id);

            return redirect()->route('employees.show', $id)->with('toast', [
                'type' => 'success',
                'message' => 'Funcionário atualizado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao atualizar funcionário: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->employeeService->delete($id);

            return redirect()->route('employees.index')->with('toast', [
                'type' => 'success',
                'message' => 'Funcionário deletado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao deletar funcionário: ' . $e->getMessage()
            ]);
        }
    }

    public function count(Request $request)
    {
        try {
            $role = $request->input('role');
        
            return $this->employeeService->count($role);
            
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao contar funcionários: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getDataTable(Request $request)
    {
        return $this->employeeService->getDataTable($request->all());
    }

    public function resetPassword(Request $request)
    {
        try {
            $this->employeeService->resetPassword($request->all());

            return redirect()->route('employees.index')->with('toast', [
                'type' => 'success',
                'message' => 'Senha restaurada com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao resetar senha: ' . $e->getMessage()
            ]);
        }
    }
}
