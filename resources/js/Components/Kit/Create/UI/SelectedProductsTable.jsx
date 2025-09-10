import { Package, Zap, Settings, Sun } from "lucide-react"
import SelectedProductsSection from "./SelectedProductsSection"

export default function SelectedProductsTable({ baseProducts, solarPanels, inverters }) {
  return (
    <div className="mt-6 rounded-xl border border-gray-300 shadow-md overflow-hidden">
      <div className="p-3 border-b border-gray-300 bg-gray-100">
        <h2 className="text-lg">Produtos Selecionados</h2>
      </div>

      <div className="p-6 space-y-8">
        <SelectedProductsSection title="Placas Solar" products={solarPanels} icon={Sun} />
        <SelectedProductsSection title="Inversor" products={inverters} icon={Zap} />
        <SelectedProductsSection title="Outros" products={baseProducts} icon={Package} />
      </div>
    </div>
  )
}
