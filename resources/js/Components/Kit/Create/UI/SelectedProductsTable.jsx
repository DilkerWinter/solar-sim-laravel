import { Package, Zap, Settings, Sun } from "lucide-react";
import SelectedProductsSection from "./SelectedProductsSection";
import TableFooter from "./TableFooter";
import { useEffect, useState } from "react";

export default function SelectedProductsTable({
    setFormData,
    baseProducts,
    solarPanels,
    inverters,
    onRemoveProduct
}) {
    const [products, setProducts] = useState([]);

    const updateFormDataWithProducts = (updatedProducts) => {
        const solarPanelProducts = updatedProducts.filter(p => p.solarPanel);
        const inverterProducts = updatedProducts.filter(p => p.inverter);

        setFormData(prev => ({
            ...prev,
            selectedProducts: updatedProducts,
            total_price: calculateTotalPrice(updatedProducts),
            generated_kw: calculateGeneratedKwh(solarPanelProducts),
            supported_kw: calculateInverterCapacity(inverterProducts)
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
            const price = Number(product.price) || 0;
            return total + (quantity * price);
        }, 0);
    };

    const calculateGeneratedKwh = (panels) => {
        return panels.reduce((total, panel) => {
            const quantity = Number(panel.quantity) || 1;
            const dailyEnergy = Number(panel.solarPanel?.average_daily_energy_wh) || 0;
            return total + (quantity * dailyEnergy);
        }, 0);
    };

    const calculateInverterCapacity = (inverters) => {
        const totalWatts = inverters.reduce((total, inverter) => {
            const quantity = Number(inverter.quantity) || 1;
            const power = Number(inverter.inverter?.max_power_watts) || 0;
            return total + (quantity * power);
        }, 0);
        return totalWatts / 1000;
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
                    products={products.filter(p => p.solarPanel)} 
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
                    products={products.filter(p => !p.inverter && !p.solarPanel)}
                    icon={Package}
                    onQuantityChange={handleQuantityChange}
                    onRemove={onRemoveProduct}
                />
            </div>

            <TableFooter products={products} />
        </div>
    );
}
