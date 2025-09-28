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
        return Proposal::find($id);
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

    public static function countByStatus($status)
    {
        return Proposal::where('status', $status)->count();
    }
}
