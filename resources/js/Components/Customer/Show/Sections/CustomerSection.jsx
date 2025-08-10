import CustomerCard from "../UI/CustomerCard";

export default function CustomerSection({ customer, setCustomer, isEditing, onDelete}) {
  if (!customer) {
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded">
        Erro: dados do cliente não encontrados.
      </div>
    );
  }

  return (
    <section className="mb-8">
      <CustomerCard
        onDelete={onDelete}
        customer={customer}
        setCustomer={setCustomer}
        isEditing={isEditing}
      />
    </section>
  );
}
