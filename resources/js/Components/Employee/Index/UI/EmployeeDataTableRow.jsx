import { useState } from "react";
import { Trash2, UserPen } from "lucide-react";
import { router } from "@inertiajs/react";
import { capitalize } from "@/Utils/capitalize";
import ConfirmModal from "@/Components/ConfirmModal";

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
            <button
                onClick={() => setIsResetModalOpen(true)}
                title="Resetar Senha"
                className="flex items-center font-semibold gap-1 text-gray-600 hover:text-gray-900 transition"
            >
                <UserPen size={16} />
                <span>Resetar Senha</span>
            </button>

            <button
                onClick={() => setIsDeleteModalOpen(true)}
                title="Deletar Funcionário"
                className="flex items-center font-semibold gap-1 text-red-600 hover:text-red-800 transition"
            >
                <Trash2 size={16} />
                <span>Deletar</span>
            </button>

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
