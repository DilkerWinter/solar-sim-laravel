import { Sun, Trash2 } from "lucide-react";
import EditableField from "@/Components/UI/Inputs/EditableField";
import ConfirmModal from "@/Components/UI/Modal/ConfirmModal";
import { useState, useEffect } from "react";
import TextField from "@/Components/UI/Fields/TextField";
import { formatDecimal } from "@/Utils/formatNumber";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import EditSelectedProductsTable from "./EditSelectedProductsTable";
import KitProductsTable from "./KitProductsTable";

export default function KitCard({
    kit,
    setKit,
    products,
    isEditing,
    onDelete,
}) {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const handleDeleteClick = () => setConfirmDeleteOpen(true);

    const [selectedInverters, setSelectedInverters] = useState([]);
    const [selectedSolarPanels, setSelectedSolarPanels] = useState([]);
    const [selectedBaseProducts, setSelectedBaseProducts] = useState([]);

    const [optionsInverters, setOptionsInverters] = useState([]);
    const [optionsSolarPanels, setOptionsSolarPanels] = useState([]);
    const [optionsBaseProducts, setOptionsBaseProducts] = useState([]);

    useEffect(() => {
        if (products) {
            setOptionsInverters(products.inverters || []);
            setOptionsSolarPanels(products.solarPanels || []);
            setOptionsBaseProducts(products.baseProducts || []);
        }
    }, [products]);

    useEffect(() => {
        if (kit.kit_products && kit.kit_products.length) {
            const solarPanels = [];
            const inverters = [];
            const baseProducts = [];

            const solarOptions = products?.solarPanels ? [...products.solarPanels] : [];
            const inverterOptions = products?.inverters ? [...products.inverters] : [];
            const baseOptions = products?.baseProducts ? [...products.baseProducts] : [];

            kit.kit_products.forEach((kp) => {
                const p = {
                    ...kp.product,
                    quantity: kp.quantity,
                    solar_panel: kp.product.solar_panel,
                    inverter: kp.product.inverter,
                };

                if (p.solar_panel) {
                    solarPanels.push(p);
                    const index = solarOptions.findIndex((opt) => opt.id === p.id);
                    if (index > -1) solarOptions.splice(index, 1);
                } else if (p.inverter) {
                    inverters.push(p);
                    const index = inverterOptions.findIndex(
                        (opt) => opt.id === p.id
                    );
                    if (index > -1) inverterOptions.splice(index, 1);
                } else {
                    baseProducts.push(p);
                    const index = baseOptions.findIndex(
                        (opt) => opt.id === p.id
                    );
                    if (index > -1) baseOptions.splice(index, 1);
                }
            });

            setSelectedSolarPanels(solarPanels);
            setSelectedInverters(inverters);
            setSelectedBaseProducts(baseProducts);

            setOptionsSolarPanels(solarOptions);
            setOptionsInverters(inverterOptions);
            setOptionsBaseProducts(baseOptions);
        }
    }, [products, kit.kit_products]);

    function handleSelect(
        value,
        selectedList,
        setSelectedList,
        optionsList,
        setOptionsList
    ) {
        const selectedItem = optionsList.find(
            (item) => item.id === Number(value)
        );
        if (!selectedItem) return;
        selectedItem.quantity = "1";
        setSelectedList([...selectedList, selectedItem]);
        setOptionsList(optionsList.filter((item) => item.id !== Number(value)));
    }

    const handleRemoveProduct = (productId) => {
        setSelectedSolarPanels((prev) => {
            const removed = prev.find((p) => p.id === productId);
            if (removed) {
                setOptionsSolarPanels((opts) => [...opts, removed]);
            }
            return prev.filter((p) => p.id !== productId);
        });

        setSelectedInverters((prev) => {
            const removed = prev.find((p) => p.id === productId);
            if (removed) {
                setOptionsInverters((opts) => [...opts, removed]);
            }
            return prev.filter((p) => p.id !== productId);
        });

        setSelectedBaseProducts((prev) => {
            const removed = prev.find((p) => p.id === productId);
            if (removed) {
                setOptionsBaseProducts((opts) => [...opts, removed]);
            }
            return prev.filter((p) => p.id !== productId);
        });
    };

    const confirmDelete = () => {
        onDelete();
        setConfirmDeleteOpen(false);
    };

    function onChange(field, value) {
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
                        <Trash2 size={22} />
                    </button>
                )}
            </div>

            <div>
                {isEditing ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                            <EditableField
                                required
                                label="Nome"
                                name="name"
                                value={kit.name}
                                onChange={(e) =>
                                    onChange("name", e.target.value)
                                }
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
                            <SelectField
                                label="Painéis Solares"
                                name="solarPanels"
                                placeholder="Selecione um Painel Solar"
                                options={optionsSolarPanels.map((sp) => ({
                                    value: sp.id,
                                    label: `${sp.name} - ${sp.brand}`,
                                }))}
                                value={""}
                                onChange={(value) =>
                                    handleSelect(
                                        value,
                                        selectedSolarPanels,
                                        setSelectedSolarPanels,
                                        optionsSolarPanels,
                                        setOptionsSolarPanels
                                    )
                                }
                            />
                            <SelectField
                                label="Inversores"
                                name="inverters"
                                placeholder="Selecione um Inversor"
                                options={optionsInverters.map((inv) => ({
                                    value: inv.id,
                                    label: `${inv.name} - ${inv.brand}`,
                                }))}
                                value={""}
                                onChange={(value) =>
                                    handleSelect(
                                        value,
                                        selectedInverters,
                                        setSelectedInverters,
                                        optionsInverters,
                                        setOptionsInverters
                                    )
                                }
                            />
                            <SelectField
                                label="Produtos Base"
                                name="baseProducts"
                                placeholder="Selecione um Produto"
                                options={optionsBaseProducts.map((bp) => ({
                                    value: bp.id,
                                    label: `${bp.name} - ${bp.brand}`,
                                }))}
                                value={""}
                                onChange={(value) =>
                                    handleSelect(
                                        value,
                                        selectedBaseProducts,
                                        setSelectedBaseProducts,
                                        optionsBaseProducts,
                                        setOptionsBaseProducts
                                    )
                                }
                            />
                        </div>

                        <EditSelectedProductsTable
                                setFormData={setKit}
                                baseProducts={selectedBaseProducts}
                                solarPanels={selectedSolarPanels}
                                inverters={selectedInverters}
                                onRemoveProduct={handleRemoveProduct}
                            />
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                            <TextField label="Nome" value={kit.name} />
                            <TextField label="Descrição" value={kit.description} />
                            <TextField
                                label="Kwh Gerados"
                                value={`${formatDecimal(kit.generated_kwh)} Kwh`}
                            />
                            <TextField
                                label="Kw Suportados"
                                value={`${formatDecimal(kit.supported_kw)} Kw`}
                            />
                        </div>

                        <KitProductsTable
                            baseProducts={selectedBaseProducts}
                            solarPanels={selectedSolarPanels}
                            inverters={selectedInverters}
                            kit={kit}
                        />
                    </div>
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
