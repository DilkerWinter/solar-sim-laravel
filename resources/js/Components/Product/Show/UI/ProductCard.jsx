import { Trash2, User } from "lucide-react";
import EditableField from "@/Components/UI/Inputs/EditableField";
import ConfirmModal from "@/Components/ConfirmModal";
import { useEffect, useState } from "react";
import TextField from "@/Components/UI/Fields/TextField";
import { formatMoney } from "@/Utils/formatMoney";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import { useToast } from "@/Contexts/ToastContext";

export default function ProductCard({ product, setProduct, isEditing, onDelete}) {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [productTypes, setProductTypes] = useState([]);
    const { error } = useToast();

    const handleDeleteClick = () => setConfirmDeleteOpen(true);

    useEffect(() => {
        axios.get("/product-types")
            .then(response => {
                setProductTypes(response.data);
            })
            .catch(err => {
                error("Erro ao buscar os tipos de produtos");
            });
    }, []); 

    const confirmDelete = () => {
        onDelete();
        setConfirmDeleteOpen(false);
    };

    function onChange(field, value){
        setProduct((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    console.log(product);

    return (
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-blue-100 text-blue-700">
                    <User className="w-5 h-5" />
                    <h2 className="font-semibold text-lg">
                        Informações do Produto
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
                            value={product.name}
                            onChange={(e) => onChange("name", e.target.value)}
                        />
                        <EditableField
                            required
                            label="Marca"
                            name="brand"
                            value={product.brand}
                            onChange={(e) => onChange("brand", e.target.value)}
                        />
                        <EditableField
                            required
                            label="Descrição"
                            name="description"
                            value={product.description}
                            onChange={(e) =>
                                onChange("description", e.target.value)
                            }
                        />
                        <EditableField
                            required
                            label="Preço"
                            name="price"
                            value={formatMoney(product.price)}
                            onChange={(e) =>
                                onChange(
                                    "price", formatMoney(e.target.value))
                            }
                        />
                        <SelectField
                            label="Categoria"
                            name="type_id"
                            value={product.type_id}
                            onChange={(value) => {
                                const selectedType = productTypes.find((t) => t.id === Number(value));
                                onChange("type_id", value);
                                onChange("type", selectedType);
                            }}
                            options={productTypes.map((type) => ({
                                value: type.id,
                                label: type.name,
                            }))}
                        />
                    </>
                ) : (
                    <>
                        <TextField label="Nome" value={product.name} />
                        <TextField label="Marca" value={product.brand}/>
                        <TextField label="Descrição" value={product.description} />
                        <TextField label="Preço" value={`R$ ${formatMoney(product.price)}`} />
                        <TextField label="Categoria" value={product.type.name} />
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
