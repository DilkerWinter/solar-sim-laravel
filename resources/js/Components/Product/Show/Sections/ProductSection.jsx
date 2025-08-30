import ProductCard from "../UI/ProductCard";

export default function ProductSection({ product, setProduct, isEditing, onDelete}) {
  if (!product) {
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded">
        Erro: dados do produto não encontrados.
      </div>
    );
  }

  return (
    <section className="mb-8">
      <ProductCard
        onDelete={onDelete}
        product={product}
        setProduct={setProduct}
        isEditing={isEditing}
      />
    </section>
  );
}
