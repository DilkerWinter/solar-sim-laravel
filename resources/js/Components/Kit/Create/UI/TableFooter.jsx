import { useEffect, useState } from "react";

export default function TableFooter({ products }) {
    const [totalPrice, setTotalPrice] = useState("0,00");
    const [totalKwh, setTotalKwh] = useState(0);
    const [supportedKw, setSupportedKw] = useState(0);

    const parsePrice = (priceString) => {
        if (typeof priceString === "number") return priceString;
        if (!priceString) return 0;
        return Number(priceString.replace(/\./g, "").replace(",", "."));
    };

    function calculatePrice() {
        const total = products.reduce((acc, product) => {
            const quantity = Number(product.quantity) || 0;
            const price = parsePrice(product.price);
            return acc + quantity * price;
        }, 0);

        setTotalPrice(
            total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
            })
        );
    }

    function calculateTotalPower() {
        const total = products.reduce((acc, product) => {
            if (product.solar_panel) {
                const quantity = Number(product.quantity) || 0;
                const energyPerDay = product.solar_panel.average_daily_energy_wh || 0;
                return acc + (energyPerDay * quantity) / 1000;
            }
            return acc;
        }, 0);

        setTotalKwh(total);
    }

    function calculateSupportedPower() {
        const total = products.reduce((acc, product) => {
            if (product.inverter) {
                const quantity = Number(product.quantity) || 0;
                const maxPower = product.inverter.max_power_watts || 0;
                return acc + (maxPower * quantity) / 1000;
            }
            return acc;
        }, 0);

        setSupportedKw(total);
    }

    useEffect(() => {
        calculatePrice();
        calculateTotalPower();
        calculateSupportedPower();
    }, [products]);

    return (
        <div className="border-t border-gray-200 px-3 py-2 bg-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-col  text-gray-900">
                    <span>kWh Gerados/dia: {totalKwh.toFixed(2)} kWh</span>
                    <span>Capacidade Inversores: {supportedKw.toFixed(2)} kW</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                    <span className="text-lg font-medium text-gray-900">
                        Preço Total: {totalPrice}
                    </span>
                </div>
            </div>
        </div>
    );
}
