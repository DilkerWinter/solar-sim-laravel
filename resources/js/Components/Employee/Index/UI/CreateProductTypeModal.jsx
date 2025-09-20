import { useState } from "react";
import axios from "axios";
import Modal from "@/Components/Modal";

export default function CreateProductTypeModal({ isOpen, onClose, refreshData, showToast }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        try {
            await axios.post("/product-types", { name });
            setLoading(false);
            refreshData();
            onClose(); 
            setName("");
            if (showToast) {
                showToast({
                    type: "success",
                    message: "Tipo de Produto cadastrado com sucesso!",
                });
            }
        } catch (error) {
            setLoading(false);
            if (showToast) {
                showToast({
                    type: "error",
                    message:
                        error.response?.data?.message ||
                        "Erro ao cadastrar Tipo de Produto",
                });
            }
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Cadastrar Tipo de Produto
                </h2>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do Tipo de Produto"
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
                        onClick={handleCreate}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        disabled={loading || !name.trim()}
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
