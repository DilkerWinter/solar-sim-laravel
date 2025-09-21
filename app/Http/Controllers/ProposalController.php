<?php

namespace App\Http\Controllers;

use App\Services\ProposalService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProposalController extends Controller
{
    protected $proposalService;

    public function __construct(ProposalService $proposalService)
    {
        $this->proposalService = $proposalService;
    }
    
    public function index()
    {
        try {
            return Inertia::render('Proposals/Index', [
                'proposalDataTableUrl' => route('proposals.dataTable')
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar propostas: ' . $e->getMessage()
            ]);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Proposals/Create');
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao abrir formulário de propostas: ' . $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $this->proposalService->create($request->all());

            return redirect()->route('proposals.index')->with('toast', [
                'type' => 'success',
                'message' => 'Proposta criado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao criar proposta: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function show(string $id)
    {
        try {
            $proposal = $this->proposalService->get($id);

            return Inertia::render('proposals/Show', [
                'proposal' => $proposal,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao carregar proposta: ' . $e->getMessage()
            ]);
        }
    }

    public function edit(string $id)
    {
        try {
            $proposal = $this->proposalService->get($id);

            return Inertia::render('Proposals/Edit', [
                'proposal' => $proposal,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao editar proposta: ' . $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $this->proposalService->update($request->all(), $id);

            return redirect()->route('proposals.show', $id)->with('toast', [
                'type' => 'success',
                'message' => 'Proposta atualizado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao atualizar proposta: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->proposalService->delete($id);

            return redirect()->route('proposals.index')->with('toast', [
                'type' => 'success',
                'message' => 'Proposta deletado com sucesso.'
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Erro ao deletar proposta: ' . $e->getMessage()
            ]);
        }
    }

    public function count(Request $request)
    {
        try {
            $role = $request->input('role');
        
            return $this->proposalService->count($role);
            
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao contar propostas: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getDataTable(Request $request)
    {
        return $this->proposalService->getDataTable($request->all());
    }

    public function countOpen()
    {
        return $this->proposalService->countOpen();
    }
}
