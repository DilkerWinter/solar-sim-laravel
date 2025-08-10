<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Customer;
use App\Services\CustomerService;
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
        if ($this->requisicaoWithDataTable($request)) {
            return $this->customerService->getDataTable($request->all());
        }

        return Inertia::render('Customers/Index', ['customerDataTableUrl' => route('customers.index')]);
    }

    public function create()
    {
        return Inertia::render('Customers/Create');
    }

    public function store(Request $request)
    {
        $this->customerService->create($request->all());

        return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
    }


    public function show(string $id)
    {
        
        $customer = $this->customerService->get($id);
        
        return Inertia::render('Customers/Show', [
            'customer' => $customer,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $customer = $this->customerService->update($request->all(), $id);

        return redirect()->route('customers.show', $customer->id)->with('success', 'Cliente atualizado com sucesso.');
    }

    public function destroy(string $id)
    {
        $this->customerService->delete($id);

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }

    public function count()
    {
        return $this->customerService->count();
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
