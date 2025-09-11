import { Package, Zap, Settings, Sun } from "lucide-react";
import SelectedProductsSection from "./SelectedProductsSection";
import TableFooter from "./TableFooter";
import { useEffect, useState } from "react";

export default function SelectedProductsTable({
    baseProducts,
    solarPanels,
    inverters,
    onRemoveProduct
}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const allProducts = [
            ...solarPanels,
            ...inverters,
            ...baseProducts,
        ];
        setProducts(allProducts);
    }, [solarPanels, inverters, baseProducts]);

    const handleQuantityChange = (productId, newQuantity) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, quantity: newQuantity }
                    : product
            )
        );
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
