import InputField from "@/Components/UI/Inputs/InputField";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import MultiSelectField from "@/Components/UI/Inputs/SelectInput";
import { useState, useEffect } from "react";
import SelectedProducts from "../UI/SelectedProductsTable";
import SelectedProductsTable from "../UI/SelectedProductsTable";

export default function CreateKitForm({ formData, setFormData, products }) {
    const [selectedInverters, setSelectedInverters] = useState([]);
    const [selectedSolarPanels, setSelectedSolarPanels] = useState([]);
    const [selectedBaseProducts, setSelectedBaseProducts] = useState([]);

    const [optionsInverters, setOptionsInverters] = useState([]);
    const [optionsSolarPanels, setOptionsSolarPanels] = useState([]);
    const [optionsBaseProducts, setOptionsBaseProducts] = useState([]);

    useEffect(() => {
        setOptionsInverters(products.inverters || []);
        setOptionsSolarPanels(products.solarPanels || []);
        setOptionsBaseProducts(products.baseProducts || []);
    }, [products]);

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

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Nome"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
                <InputField
                    label="Descrição"
                    name="description"
                    required
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
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

            <SelectedProductsTable
                setFormData={setFormData}
                baseProducts={selectedBaseProducts}
                solarPanels={selectedSolarPanels}
                inverters={selectedInverters}
                onRemoveProduct={handleRemoveProduct}
            />
        </section>
    );
}
