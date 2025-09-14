import { formatDecimal, formatMoneyWithPrefix } from "@/Utils/formatNumber";

export default function KitProductsTableFooter({ kit }) {
    return (
        <div className="border-t border-gray-200 px-3 py-2 bg-gray-100">
            <div className="flex justify-end">
                <div className="flex items-center gap-1 text-sm">
                    <span className="text-lg font-medium text-gray-900">
                        Preço Total: {formatMoneyWithPrefix(kit.total_price)}
                    </span>
                </div>
            </div>
        </div>
    );
}
