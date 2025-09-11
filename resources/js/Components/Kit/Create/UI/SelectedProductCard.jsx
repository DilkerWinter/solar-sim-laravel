import { useState } from "react";
import QuantityInput from "./InputQuantity";

export default function SelectedProductCard({ product }) {
    const [quantity, setQuantity] = useState("1");

    const isInverter = product.inverter;
    const isSolarPanel = product.solarPanel;

    const renderSpecifications = () => {
        if (isInverter) {
            return (
                <div className="space-y-0.5 text-gray-600 text-sm">
                    <div>
                        <span>Tipo: </span>
                        <span className="text-gray-900">
                            {product.inverter.type}
                        </span>
                    </div>
                    <div>
                        <span>Potência: </span>
                        <span className="text-gray-900">
                            {product.inverter.max_power_watts}W
                        </span>
                    </div>
                    <div>
                        <span>Tensão: </span>
                        <span className="text-gray-900">
                            {product.inverter.operating_voltage}V
                        </span>
                    </div>
                </div>
            );
        }

        if (isSolarPanel) {
            return (
                <div className="space-y-0.5 text-gray-600 text-sm">
                    <div>
                        <span>Potência: </span>
                        <span className="text-gray-900">
                            {product.solarPanel.potency_watts_formatted}W
                        </span>
                    </div>
                    <div>
                        <span>Energia diária: </span>
                        <span className="text-gray-900">
                            {product.solarPanel.average_daily_energy_wh}Wh
                        </span>
                    </div>
                    <div>
                        <span>Tensão: </span>
                        <span className="text-gray-900">
                            {product.solarPanel.operating_voltage}V
                        </span>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="border border-gray-300 bg-white rounded-lg overflow-hidden">
            <div className="p-3">
                <div className="flex items-start justify-between">
                    <h3 className="text-base font-medium leading-snug">
                        {product.name}
                    </h3>
                    <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-2xl font-medium text-sm bg-gray-100 text-gray-800 border border-gray-300 whitespace-nowrap">
                            {product.brand}
                        </span>
                    </div>
                </div>

                {product.description && (
                    <p className="text-gray-600 mb-2 text-sm line-clamp-2">
                        {product.description}
                    </p>
                )}

                <div className="mb-2">{renderSpecifications()}</div>
            </div>

            <div className="border-t border-gray-200 px-3 py-2 bg-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                        Preço Unitário: R$ {product.price}
                    </span>
                  </div>
                    
                    <div className="flex items-center gap-1 text-sm">
                        <span>Qtd:</span>
                        <QuantityInput
                            name="product_quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
