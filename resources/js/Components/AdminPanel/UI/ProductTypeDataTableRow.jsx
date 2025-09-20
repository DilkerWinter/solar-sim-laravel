import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { router } from "@inertiajs/react";
import { capitalize } from "@/Utils/capitalize";
import ConfirmModal from "@/Components/UI/Modal/ConfirmModal";
import { DataTableDeleteButton } from "@/Components/UI/Buttons/DataTableDeleteButton";
import { DataTableEditButton } from "@/Components/UI/Buttons/DataTableEditButton";
import EditProductTypeModal from "@/Components/Employee/Index/UI/EditProductTypeModal";

function Name({ value }) {
    return (
        <div className="flex flex-col">
            <span className="font-semibold text-gray-700">
                {capitalize(value)}
            </span>
        </div>
    );
}

function Actions({ productType, refreshData }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDelete = () => {
        router.delete(`/product-types/${productType.id}`, {
            onSuccess: () => refreshData(),
        });
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="flex gap-6">
            <DataTableEditButton onClick={() => setIsEditModalOpen(true)} />
            <DataTableDeleteButton onClick={() => setIsDeleteModalOpen(true)} />

            <EditProductTypeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                productType={productType}
                refreshData={refreshData}
            />

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

export default function ProductTypeDataTableRow({
    productType,
    headers,
    refreshData,
}) {
    return (
        <tr className="border-t border-gray-400 shadow-gray-300">
            {headers.map((header) => (
                <td
                    key={header.key}
                    className={`p-4 ${
                        header.key === "actions" ? "w-[15%]" : ""
                    }`}
                >
                    {header.key === "name" ? (
                        <Name value={productType.name} />
                    ) : header.key === "actions" ? (
                        <Actions
                            productType={productType}
                            refreshData={refreshData}
                        />
                    ) : (
                        productType[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
