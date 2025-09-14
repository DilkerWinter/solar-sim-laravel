import { useState } from "react";
import { UserPen } from "lucide-react";
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

function Actions({ employee }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleResetPassword = () => {
        router.post('/employees/reset-password', { id: employee.id });
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                title="Resetar Senha"
                className="flex items-center font-semibold gap-1 text-gray-600 hover:text-gray-900 transition"
            >
                <UserPen size={16} />
                <span>Resetar Senha</span>
            </button>

            <ConfirmModal
                isOpen={isModalOpen}
                title="Resetar Senha"
                message={`Deseja realmente resetar a senha de ${employee.name}?`}
                onConfirm={handleResetPassword}
                onClose={() => setIsModalOpen(false)}
                theme="danger"
            />
        </>
    );
}

export default function EmployeeDataTableRow({ employee, headers }) {
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
                        <Actions employee={employee} />
                    ) : (
                        employee[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
