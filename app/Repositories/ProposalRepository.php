<?php

namespace App\Repositories;

use App\Models\Proposal;
use Exception;

class ProposalRepository
{
    public function getAll()
    {
        return Proposal::all();
    }

    public function get($id)
    {
        return Proposal::with([
            'customer',
            'kit.kitProducts.product',
            'address.energyInfo',
        ])->where('id', $id)
        ->first();
    }


    public function create($data)
    {
        try {
            $proposal = new Proposal();
            $proposal->fill($data);
            $proposal->status = Proposal::STATUS_PENDING;
            $proposal->save();
            return $proposal;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($data, $id)
    {
        try {
            $proposal = Proposal::findOrFail($id);
            $proposal->fill($data);
            $proposal->save();
            return $proposal;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return Proposal::destroy($id);
    }

    public function countByStatus($status)
    {
        return Proposal::where('status', $status)->count();
    }

    public function pendingProposal($proposalId)
    {
        $proposal = Proposal::find($proposalId);
        $proposal->status = Proposal::STATUS_PENDING;
        $proposal->save();
    }

    public function approveProposal($proposalId)
    {
        $proposal = Proposal::find($proposalId);
        $proposal->status = Proposal::STATUS_APPROVED;
        $proposal->save();
    }

    public function rejectProposal($proposalId)
    {
        $proposal = Proposal::find($proposalId);
        $proposal->status = Proposal::STATUS_REJECTED;
        $proposal->save();
    }
}
