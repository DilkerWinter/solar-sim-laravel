import TextField from "@/Components/UI/Fields/TextField";
import { ProductItem } from "./ProductItem";

export function SelectedKitSection({ selectedKit }) {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold border-b pb-1 mb-4">
                Dados completos do Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <TextField label="Nome" value={selectedKit.name} />
                <TextField label="Descricao" value={selectedKit.description} />
                <TextField
                    label="Preco total bruto"
                    value={`R$ ${selectedKit.total_price_formatted}`}
                />
                <TextField
                    label="Total de energia"
                    value={`${selectedKit.generated_kwh_formatted} KwH`}
                />
                <TextField
                    label="Total de energia suportada"
                    value={`${selectedKit.supported_kw_formatted} Kw`}
                />
            </div>

            <h3 className="text-lg font-semibold border-b pb-1 mb-4 mt-4">
                Produtos
            </h3>

            <div className="flex flex-col">
                {selectedKit.kit_products.map((productItem) => (
                    <ProductItem
                        key={productItem.id}
                        productItem={productItem}
                    />
                ))}
            </div>
        </div>
    );
}
