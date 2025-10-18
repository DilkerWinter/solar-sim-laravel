import { formatMoneyWithPrefix } from '@/Utils/formatNumber';
import { Zap, Activity, Sun, DollarSign, AlertCircle } from 'lucide-react';
import { useEffect, useState } from "react";

export default function EditTableFooter({ products }) {
    const [totalPrice, setTotalPrice] = useState("0,00");
    const [totalKw, setTotalKw] = useState(0);
    const [supportedKw, setSupportedKw] = useState(0);
    const [totalPotency, setTotalPotency] = useState(0);

    const parsePrice = (priceString) => {
        if (typeof priceString === "number") return priceString;
        if (!priceString) return 0;
        return Number(priceString.replace(/\./g, "").replace(",", "."));
    };

    function calculatePrice() {
        const total = products.reduce((acc, product) => {
            const quantity = Number(product.quantity) || 0;
            const price = parsePrice(product.price_formatted);
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

    function calculateTotalPotency() {
        const total = products.reduce((acc, product) => {
            if (product.solar_panel) {
                const quantity = Number(product.quantity) || 0;
                const potency = product.solar_panel.potency_watts || 0;
                return acc + (potency * quantity) / 1000;
            }
            return acc;
        }, 0);

        setTotalPotency(total);
    }

    function calculateTotalPower() {
        const total = products.reduce((acc, product) => {
            if (product.solar_panel) {
                const quantity = Number(product.quantity) || 0;
                const energyPerMonth = product.solar_panel.average_monthly_energy_w || 0;
                return acc + (energyPerMonth * quantity) / 1000;
            }
            return acc;
        }, 0);

        setTotalKw(total);
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
        calculateTotalPotency();
    }, [products]);

    const isInverterInsufficient = supportedKw < totalPotency;

    return (
        <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="px-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <span className="font-medium whitespace-nowrap">
                                kW Gerados/mês:
                            </span>
                            <span className="text-gray-900 font-semibold">
                                {totalKw.toFixed(2)} kW
                            </span>
                        </div>

                        <div
                            className={`flex items-center gap-2 text-sm ${
                                isInverterInsufficient
                                    ? "text-red-600"
                                    : "text-gray-700"
                            }`}
                        >
                            <Activity className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium whitespace-nowrap">
                                Capacidade Inversores:
                            </span>
                            <span
                                className={
                                    isInverterInsufficient
                                        ? "font-bold"
                                        : "text-gray-900 font-semibold"
                                }
                            >
                                {supportedKw.toFixed(2)} kW
                            </span>
                            {isInverterInsufficient && (
                                <AlertCircle className="w-4 h-4 ml-1 flex-shrink-0" />
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Sun className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="font-medium whitespace-nowrap">
                                Potência Total:
                            </span>
                            <span className="text-gray-900 font-semibold">
                                {totalPotency.toFixed(2)} kW
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-start md:justify-end">
                        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="bg-green-100 p-2 rounded-full">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                    Preço Total
                                </span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {formatMoneyWithPrefix(totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
