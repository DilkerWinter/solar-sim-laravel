import SelectedProductCard from "./SelectedProductCard";

export default function SelectedProductsSection({ title, products, icon: Icon, onQuantityChange }) {
    let bgColor = "bg-gray-100";
    let textColor = "text-gray-700";
    let borderColor = "border-gray-300";

    if (title.toLowerCase() === "placas solar") {
        bgColor = "bg-green-100";
        textColor = "text-green-700";
        borderColor = "border-green-300";
    } else if (title.toLowerCase() === "inversor") {
        bgColor = "bg-blue-100";
        textColor = "text-blue-700";
        borderColor = "border-blue-300";
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 px-1 ">
                <div
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-2xl text-sm font-medium border ${bgColor} ${textColor} ${borderColor}`}
                >
                    <Icon className="w-4 h-4" />
                    <h3 className="text-sm font-medium">{title}</h3>
                </div>
                <div className="h-px bg-gray-100 flex-1 ml-3" />
            </div>

            {products && products.length > 0 ? (
                <div className="space-y-2">
                    {products.map((product, idx) => (
                        <SelectedProductCard 
                            key={idx} 
                            product={product}
                            onQuantityChange={onQuantityChange}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-4 px-3 text-center text-sm text-gray-400">
                    Nenhum produto selecionado
                </div>
            )}
        </div>
    );
}
