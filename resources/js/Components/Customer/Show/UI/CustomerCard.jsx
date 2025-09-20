import { Trash, Trash2, TrashIcon, User } from "lucide-react";
import EditableField from "@/Components/UI/Inputs/EditableField";
import TextField from "../../../UI/Fields/TextField";
import ConfirmModal from "@/Components/UI/Modal/ConfirmModal";
import { useState } from "react";
import { formatPhone } from "@/Utils/formatPhone";
import { formatDocumentNumber } from "@/Utils/formatDocumentNumber";

export default function CustomerCard({ customer, setCustomer, isEditing, onDelete}) {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const handleDeleteClick = () => setConfirmDeleteOpen(true);

    const confirmDelete = () => {
        onDelete();
        setConfirmDeleteOpen(false);
    };

    function onChange(field, value){
        setCustomer((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-blue-100 text-blue-700">
                    <User className="w-5 h-5" />
                    <h2 className="font-semibold text-lg">
                        Informações do Cliente
                    </h2>
                </div>
                {isEditing && (
                    <button
                        onClick={handleDeleteClick}
                        className="flex items-center gap-2 px-2 py-2 rounded-2xl text-sm font-medium transition-all duration-200 shadow-sm text-red-600  hover:text-red-700 hover:bg-gray-300"
                    >
                        <Trash2 size={22}/>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                {isEditing ? (
                    <>
                        <EditableField
                            required
                            label="Nome"
                            name="name"
                            value={customer.name}
                            onChange={(e) => onChange("name", e.target.value)}
                        />
                        <EditableField
                            required
                            label="Email"
                            name="email"
                            value={customer.email}
                            onChange={(e) => onChange("email", e.target.value)}
                        />
                        <EditableField
                            required
                            label="Telefone"
                            name="phone"
                            value={customer.phone}
                            onChange={(e) =>
                                onChange("phone", formatPhone(e.target.value))
                            }
                        />
                        <EditableField
                            required
                            label="CPF/CNPJ"
                            name="document_number"
                            value={customer.document_number}
                            onChange={(e) =>
                                onChange(
                                    "document_number",
                                    formatDocumentNumber(e.target.value)
                                )
                            }
                        />
                    </>
                ) : (
                    <>
                        <TextField label="Nome" value={customer.name} />
                        <TextField label="Email" value={customer.email} />
                        <TextField label="Telefone" value={customer.phone} />
                        <TextField
                            label="CPF/CNPJ"
                            value={customer.document_number}
                        />
                    </>
                )}
            </div>
            <ConfirmModal
                isOpen={confirmDeleteOpen}
                title="Confirmar deleção"
                message="Tem certeza que deseja deletar este cliente? Esta ação não pode ser desfeita."
                onConfirm={confirmDelete}
                onClose={() => setConfirmDeleteOpen(false)}
                theme="danger"
            />
        </div>
    );
}
