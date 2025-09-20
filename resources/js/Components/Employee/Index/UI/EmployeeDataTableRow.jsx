import { useState } from "react";
import { Trash2, UserPen } from "lucide-react";
import { router } from "@inertiajs/react";
import { capitalize } from "@/Utils/capitalize";
import ConfirmModal from "@/Components/UI/Modal/ConfirmModal";
import { DataTableDeleteButton } from "@/Components/UI/Buttons/DataTableDeleteButton";
import { DataTableResetPasswordButton } from "./DataTableResetPasswordButton";

function Name({ value }) {
    return (
        <div className="flex flex-col">
            <span className="font-semibold text-gray-700">{capitalize(value)}</span>
        </div>
    );
}

function Actions({ employee, refreshData }) {
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleResetPassword = () => {
        router.post('/employees/reset-password', { id: employee.id }, {
            onSuccess: () => refreshData(),
        });
        setIsResetModalOpen(false);
    };

    const handleDeleteEmployee = () => {
        router.delete(`/employees/${employee.id}`, {
            onSuccess: () => refreshData(),
        });
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="flex gap-6"> 
                
            <DataTableResetPasswordButton onClick={() => setIsResetModalOpen(true)} />

            <DataTableDeleteButton onClick={() => setIsDeleteModalOpen(true)}/>

            <ConfirmModal
                isOpen={isResetModalOpen}
                title="Resetar Senha"
                message={`Deseja realmente resetar a senha de ${employee.name}?`}
                onConfirm={handleResetPassword}
                onClose={() => setIsResetModalOpen(false)}
                theme="danger"
            />

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Deletar Funcionário"
                message={`Deseja realmente deletar ${employee.name}? Esta ação não pode ser desfeita.`}
                onConfirm={handleDeleteEmployee}
                onClose={() => setIsDeleteModalOpen(false)}
                theme="danger"
            />
        </div>
    );
}


export default function EmployeeDataTableRow({ employee, headers, refreshData }) {
    return (
        <tr className="border-t border-gray-400 shadow-gray-300">
            {headers.map((header) => (
                <td key={header.key} className="p-4">
                    {header.key === "name" ? (
                        <Name value={employee.name} />
                    ) : header.key === "email" ? (
                        <Name value={employee.email} />
                    ) : header.key === "role" ? (
                        <Name value={employee.role} />
                    ) : header.key === "actions" ? (
                        <Actions employee={employee} refreshData={refreshData} />
                    ) : (
                        employee[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
