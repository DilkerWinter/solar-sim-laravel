import ProductTypeDataTableSection from "./ProductTypeDataTableSection";

export function ProductTypeSection({ dataTableUrl }) {
    return (
        <div className="mt-8">
            <div className="border shadow-md rounded-2xl p-4 border-gray-300 bg-white">
                <h1 className="text-2xl font-medium mb-2">
                    Categoria de Produtos
                </h1>
                <ProductTypeDataTableSection dataTableUrl={dataTableUrl} />
            </div>
        </div>
    );
}
