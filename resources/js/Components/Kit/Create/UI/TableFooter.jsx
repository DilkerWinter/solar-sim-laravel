import { useEffect, useState } from "react";

export default function TableFooter({ products }) {
  const [totalPrice, setTotalPrice] = useState("0,00");
  const [totalKwh, setTotalKwh] = useState(0);

  const parsePrice = (priceString) => {
    // Se o preço vier como número, retorna ele direto
    if (typeof priceString === 'number') return priceString;
    // Se não vier preço, retorna 0
    if (!priceString) return 0;
    // Converte string para número
    return Number(priceString.replace(/\./g, "").replace(",", "."));
  };

  useEffect(() => {
    // Recalcula o total sempre que products mudar
    const total = products.reduce((acc, product) => {
      const quantity = Number(product.quantity) || 0;
      const price = parsePrice(product.price);
      return acc + (quantity * price);
    }, 0);

    // Atualiza o preço total formatado
    setTotalPrice(
      total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
    );

    // Log para debug
    console.log('Products changed:', products);
    console.log('New total:', total);
  }, [products]); // Observa mudanças em products

  return (
    <div className="border-t border-gray-200 px-3 py-2 bg-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-900">
            KhW Gerados: {totalKwh}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-sm font-medium text-gray-900">
            Preço Total: {totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}