import { Package, Zap, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { parseToCents } from "@/Utils/formatNumber";
import SelectedProductsSection from "../../Create/UI/SelectedProductsSection";
import EditTableFooter from "./EditTableFooter";

export default function EditSelectedProductsTable({
    setFormData,
    baseProducts,
    solarPanels,
    inverters,
    onRemoveProduct
}) {
    const [products, setProducts] = useState([]);

    const updateFormDataWithProducts = (updatedProducts) => {
        const solarPanelProducts = updatedProducts.filter(p => p.solar_panel);
        const inverterProducts = updatedProducts.filter(p => p.inverter);

        setFormData(prev => ({
            ...prev,
            selectedProducts: updatedProducts,
            total_price: calculateTotalPrice(updatedProducts),
            generated_kw_month: calculateGeneratedKwMonth(solarPanelProducts),
            supported_kw: calculateInverterCapacity(inverterProducts),
            total_potency_kw: calculateTotalPotency(solarPanelProducts),
        }));
    };

    useEffect(() => {
        const allProducts = [
            ...solarPanels,
            ...inverters,
            ...baseProducts,
        ];
        setProducts(allProducts);
        updateFormDataWithProducts(allProducts);
    }, [solarPanels, inverters, baseProducts]);

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => {
            const quantity = Number(product.quantity) || 1;
            const priceInCents = parseToCents(product.price);
            return total + quantity * priceInCents;
        }, 0);
    };

    const calculateGeneratedKwMonth = (panels) => {
        const totalWh = panels.reduce((total, panel) => {
            const quantity = Number(panel.quantity) || 1;
            const monthlyEnergy = Number(panel.solar_panel?.average_monthly_energy_w) || 0;
            return total + quantity * monthlyEnergy;
        }, 0);

        return totalWh / 1000;
    };

    const calculateInverterCapacity = (inverters) => {
        const totalWatts = inverters.reduce((total, inverter) => {
            const quantity = Number(inverter.quantity) || 1;
            const power = Number(inverter.inverter?.max_power_watts) || 0;
            return total + quantity * power;
        }, 0);

        return totalWatts / 1000;
    };

    const calculateTotalPotency = (panels) => {
        return panels.reduce((acc, panel) => {
            if (panel.solar_panel) {
                const quantity = Number(panel.quantity) || 0;
                const potency = panel.solar_panel.potency_watts || 0;
                return acc + (potency * quantity) / 1000;
            }
            return acc;
        }, 0);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedProducts = products.map(product =>
            product.id === productId
                ? { ...product, quantity: newQuantity }
                : product
        );

        setProducts(updatedProducts);
        updateFormDataWithProducts(updatedProducts);
    };

    return (
        <div className="mt-6 rounded-xl border border-gray-300 shadow-md overflow-hidden">
            <div className="p-3 border-b border-gray-300 bg-gray-100">
                <h2 className="text-lg">Produtos Selecionados</h2>
            </div>

            <div className="p-6 space-y-8">
                <SelectedProductsSection
                    title="Placas Solar"
                    products={products.filter(p => p.solar_panel)}
                    icon={Sun}
                    onQuantityChange={handleQuantityChange}
                    onRemove={onRemoveProduct}
                />
                <SelectedProductsSection
                    title="Inversor"
                    products={products.filter(p => p.inverter)}
                    icon={Zap}
                    onQuantityChange={handleQuantityChange}
                    onRemove={onRemoveProduct}
                />
                <SelectedProductsSection
                    title="Outros"
                    products={products.filter(p => !p.inverter && !p.solar_panel)}
                    icon={Package}
                    onQuantityChange={handleQuantityChange}
                    onRemove={onRemoveProduct}
                />
            </div>

            <EditTableFooter products={products} />
        </div>
    );
}
