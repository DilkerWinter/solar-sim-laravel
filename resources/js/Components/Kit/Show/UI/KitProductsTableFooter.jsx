import { formatDecimal, formatMoneyWithPrefix } from "@/Utils/formatNumber";

export default function KitProductsTableFooter({ kit }) {
    return (
        <div className="border-t border-gray-200 px-3 py-2 bg-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-col  text-gray-900">
                    <span>kWh Gerados/dia: {formatDecimal(kit.generated_kwh)} kWh</span>
                    <span>Capacidade Inversores: {formatDecimal(kit.supported_kw)} kW</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                    <span className="text-lg font-medium text-gray-900">
                        Preço Total: {formatMoneyWithPrefix(kit.total_price)}
                    </span>
                </div>
            </div>
        </div>
    );
}
