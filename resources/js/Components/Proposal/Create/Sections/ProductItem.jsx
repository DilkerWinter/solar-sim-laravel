import { capitalize } from "@/Utils/capitalize";

export function ProductItem({ productItem }) {
    console.log(productItem);
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <p className="font-medium text-gray-800">
                    {capitalize(productItem.product.name)}
                </p>

                {productItem.product.solar_panel && (
                    <div className="flex flex-row gap-4 mt-1">
                        <p className="text-sm text-gray-500">
                            Geração média diária:{" "}
                            {productItem.product.solar_panel.average_daily_energy_wh_formatted} W
                        </p>

                        <p className="text-sm text-gray-500">
                            Potência do painel:{" "}
                            {productItem.product.solar_panel.potency_watts_formatted} W
                        </p>
                    </div>
                )}

                {productItem.product.inverter && (
                    <div className="flex flex-row gap-4 mt-1">
                        <p className="text-sm text-gray-500">
                            Potência máxima do inversor:{" "}
                            {productItem.product.inverter.max_power_watts_formatted} W
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-end text-right">
                <p className="font-semibold text-gray-700">
                    R$ {productItem.product.price_formatted}
                </p>
                <p className="text-sm text-gray-500">
                    Quantidade: {productItem.quantity}x
                </p>
            </div>
        </div>
    );
}
