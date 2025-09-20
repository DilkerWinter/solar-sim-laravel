import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { router } from "@inertiajs/react";
import { capitalize } from "@/Utils/capitalize";
import ConfirmModal from "@/Components/ConfirmModal";
import { DataTableDeleteButton } from "@/Components/UI/Buttons/DataTableDeleteButton";

function Name({ value }) {
    return (
        <div className="flex flex-col">
            <span className="font-semibold text-gray-700">{capitalize(value)}</span>
        </div>
    );
}

function Actions({ productType, refreshData }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEdit = () => {
        router.visit(`/productTypes/${productType.id}/edit`);
    };

    const handleDelete = () => {
        router.delete(`/productTypes/${productType.id}`, {
            onSuccess: () => refreshData(),
        });
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="flex gap-6">
            <button
                onClick={handleEdit}
                title="Editar Tipo de Produto"
                className="flex items-center font-semibold gap-1 text-blue-600 hover:text-blue-800 transition"
            >
                <Pencil size={16} />
                <span>Editar</span>
            </button>

            <button
                title="Deletar Tipo de Produto"
                className="flex items-center font-semibold gap-1 text-red-600 hover:text-red-800 transition"
            >
                <Trash2 size={16} />
                <span>Deletar</span>
            </button>
                
            <DataTableDeleteButton onClick={() => setIsDeleteModalOpen(true)}/>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Deletar Tipo de Produto"
                message={`Deseja realmente deletar ${productType.name}? Esta ação não pode ser desfeita.`}
                onConfirm={handleDelete}
                onClose={() => setIsDeleteModalOpen(false)}
                theme="danger"
            />
        </div>
    );
}

export default function ProductTypeDataTableRow({ productType, headers, refreshData }) {
    return (
        <tr className="border-t border-gray-400 shadow-gray-300">
            {headers.map((header) => (
                <td key={header.key} className="p-4">
                    {header.key === "name" ? (
                        <Name value={productType.name} />
                    ) : header.key === "actions" ? (
                        <Actions productType={productType} refreshData={refreshData} />
                    ) : (
                        productType[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
