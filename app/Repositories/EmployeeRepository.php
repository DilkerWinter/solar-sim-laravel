<?php

namespace App\Repositories;

use App\Models\User;
use Exception;

class EmployeeRepository
{
    public function getAll()
    {
        return User::all();
    }

    public function get($id)
    {
        return User::find($id);
    }

    public function create($data)
    {
        try {
            $employee = new User;
            $employee->fill($data);
            $employee->password = bcrypt(env('DEFAULT_EMPLOYEE_PASSWORD'));
            $employee->save();

            return $employee;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update($data, $id)
    {
        try {
            $employee = User::findOrFail($id);
            $employee->fill($data);
            $employee->save();

            return $employee;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function delete($id)
    {
        return User::destroy($id);
    }

    public function count($role = null)
    {
        $query = User::query();
        if ($role) {
            $query->where('role', $role);
        }
        return $query->count();
    }

    public function resetPassword($data)
    {
        try {
            $employee = User::findOrFail($data['id']);
            $employee->password = bcrypt(env('DEFAULT_EMPLOYEE_PASSWORD'));
            $employee->save();

            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

}
