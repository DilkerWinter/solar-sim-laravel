import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";

export default function EditProductTypeModal({
    isOpen,
    onClose,
    productType,
    refreshData,
}) {
    const [name, setName] = useState(productType?.name || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productType) setName(productType.name);
    }, [productType]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await axios.put(`/product-types/${productType.id}`, { name });
            setLoading(false);
            refreshData();
            onClose();
            if (showToast) {
                showToast({
                    type: "success",
                    message: "Tipo de Produto atualizado com sucesso!",
                });
            }
        } catch (error) {
            setLoading(false);
            if (showToast) {
                showToast({
                    type: "error",
                    message:
                        error.response?.data?.message ||
                        "Erro ao atualizar Tipo de Produto",
                });
            }
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Editar Tipo de Produto
                </h2>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
