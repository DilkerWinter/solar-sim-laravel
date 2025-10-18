import TextField from "@/Components/UI/Fields/TextField";
import { ProductItem } from "./ProductItem";

export function SelectedKitSection({ selectedKit }) {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold border-b pb-1 mb-4">
                Dados Completos do Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <TextField label="Nome" value={selectedKit.name} />
                <TextField label="Descrição" value={selectedKit.description} />
                <TextField
                    label="Preço Total Bruto"
                    value={`R$ ${selectedKit.total_price_formatted}`}
                />
                <TextField
                    label="Energia Gerada por Mês"
                    value={`${selectedKit.generated_kw_month_formatted} kWh`}
                />
                <TextField
                    label="Potência Total Gerada"
                    value={`${selectedKit.total_potency_kw_formatted} kW`}
                />
                <TextField
                    label="Potência Suportada pelos Inversores"
                    value={`${selectedKit.supported_kw_formatted} kW`}
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
