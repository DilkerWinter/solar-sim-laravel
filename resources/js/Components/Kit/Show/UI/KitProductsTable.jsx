import { Package, Zap, Settings, Sun } from "lucide-react";
import KitProductsSection from "./KitProductsSection";
import KitProductsTableFooter from "./KitProductsTableFooter";

export default function KitProductsTable({ baseProducts, solarPanels, inverters, kit }) {
    return (
        <div className="mt-6 rounded-xl border border-gray-300 shadow-md overflow-hidden">
            <div className="p-3 border-b border-gray-300 bg-gray-100">
                <h2 className="text-lg">Produtos</h2>
            </div>

            <div className="p-6 space-y-8">
                <KitProductsSection
                    title="Placas Solar"
                    products={solarPanels} 
                    icon={Sun}
                />
                <KitProductsSection
                    title="Inversor"
                    products={inverters}
                    icon={Zap}
                />
                <KitProductsSection
                    title="Outros"
                    products={baseProducts}
                    icon={Package}
                />
            </div>
            <KitProductsTableFooter 
                kit={kit}
            />
        </div>
    );
}
