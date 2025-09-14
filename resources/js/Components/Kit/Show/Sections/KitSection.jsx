import KitCard from "../UI/KitCard";

export default function KitSection({ kit, setKit, products, isEditing, onDelete}) {
  if (!kit) {
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded">
        Erro: dados do kit não encontrados.
      </div>
    );
  }

  return (
    <section className="mb-8">
      <KitCard
        onDelete={onDelete}
        kit={kit}
        products={products}
        setKit={setKit}
        isEditing={isEditing}
      />
    </section>
  );
}
