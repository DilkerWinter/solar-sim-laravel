import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { router } from "@inertiajs/react";
import { capitalize } from "@/Utils/capitalize";
import ConfirmModal from "@/Components/ConfirmModal";
import { DataTableDeleteButton } from "@/Components/UI/Buttons/DataTableDeleteButton";
import { DataTableEditButton } from "@/Components/UI/Buttons/DataTableEditButton";

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
                
            <DataTableEditButton onClick={handleEdit}/>

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
