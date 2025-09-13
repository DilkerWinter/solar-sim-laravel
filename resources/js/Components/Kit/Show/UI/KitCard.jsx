import { Sun, Trash2 } from "lucide-react";
import EditableField from "@/Components/UI/Inputs/EditableField";
import ConfirmModal from "@/Components/ConfirmModal";
import { useState } from "react";
import TextField from "@/Components/UI/Fields/TextField";
import InputField from "@/Components/UI/Inputs/InputField";
import { formatDecimal } from "@/Utils/formatNumber";

export default function KitCard({ kit, setKit, isEditing, onDelete}) {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const handleDeleteClick = () => setConfirmDeleteOpen(true);

    const confirmDelete = () => {
        onDelete();
        setConfirmDeleteOpen(false);
    };

    function onChange(field, value){
        setKit((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-blue-100 text-blue-700">
                    <Sun className="w-5 h-5" />
                    <h2 className="font-semibold text-lg">
                        Informações do Kit
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
                            value={kit.name}
                            onChange={(e) => onChange("name", e.target.value)}
                        />
                        <EditableField
                            required
                            label="Descrição"
                            name="description"
                            value={kit.description}
                            onChange={(e) =>
                                onChange("description", e.target.value)
                            }
                        />
                        <InputField
                            required
                            label="Preço"
                            name="price"
                            value={formatDecimal(kit.price)}
                            onChange={(e) =>
                                onChange(
                                    "price", formatDecimal(e.target.value))
                            }
                            prefix="R$"
                        />
                        <InputField
                            required
                            label="Kwh Gerados"
                            name="generated_kwh"
                            value={formatDecimal(kit.generated_kwh)}
                            onChange={(e) =>
                                onChange(
                                    "generated_kwh", formatDecimal(e.target.generated_kwh))
                            }
                            prefix="R$"
                        />
                        <InputField
                            required
                            label="Kw Suportados"
                            name="supported_kw"
                            value={formatDecimal(kit.supported_kw)}
                            onChange={(e) =>
                                onChange(
                                    "supported_kw", formatDecimal(e.target.supported_kw))
                            }
                            prefix="R$"
                        />
                    </>
                ) : (
                    <>
                        <TextField label="Nome" value={kit.name} />
                        <TextField label="Descrição" value={kit.description} />
                        <TextField label="Preço" value={`R$ ${formatDecimal(kit.price)}`} />
                        <TextField label="Kwh Gerados" value={`R$ ${formatDecimal(kit.generated_kwh)}`} />
                        <TextField label="Kw Suportados" value={`R$ ${formatDecimal(kit.supported_kw)}`} />
                    </>
                )}
            </div>
            <ConfirmModal
                isOpen={confirmDeleteOpen}
                title="Confirmar deleção"
                message="Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita."
                onConfirm={confirmDelete}
                onClose={() => setConfirmDeleteOpen(false)}
                theme="danger"
            />
        </div>
    );
}
