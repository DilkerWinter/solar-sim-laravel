<?php

namespace App\Http\Controllers;

use App\Services\CustomerService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    protected $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    public function index(Request $request)
    {
        try {
            if ($this->requisicaoWithDataTable($request)) {
                return $this->customerService->getDataTable($request->all());
            }

            return Inertia::render('Customers/Index', [
                'customerDataTableUrl' => route('customers.index')
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar clientes: ' . $e->getMessage()
            ]);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Customers/Create');
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao abrir formulário de cadastro: ' . $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $this->customerService->create($request->all());

            return redirect()->route('customers.index')->with('toast', [
                'type' => 'success',
                'message' => 'Cliente cadastrado com sucesso.'
            ]);

        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao cadastrar cliente: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function show(Request $request, string $id)
    {
        try {
            $customer = $this->customerService->get($id);

            if($this->jsonRequest($request)){
                return $customer;
            }

            return Inertia::render('Customers/Show', [
                'customer' => $customer,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar cliente: ' . $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $customer = $this->customerService->update($request->all(), $id);

            return redirect()->route('customers.show', $customer->id)->with('toast', [
                'type' => 'success',
                'message' => 'Cliente atualizado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao atualizar cliente: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->customerService->delete($id);

            return redirect()->route('customers.index')->with('toast', [
                'type' => 'success',
                'message' => 'Cliente deletado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao deletar cliente: ' . $e->getMessage()
            ]);
        }
    }

    public function count()
    {
        try {
            return $this->customerService->count();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao contar clientes: ' . $e->getMessage()
            ], 500);
        }
    }

    private function requisicaoWithDataTable(Request $request)
    {
        return $request->ajax() && (
            $request->has('page') ||
            $request->has('perPage') ||
            $request->has('search') ||
            $request->has('sortKey')
        );
    }
}
