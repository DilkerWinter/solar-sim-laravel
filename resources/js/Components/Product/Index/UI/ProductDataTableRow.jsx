import {Banknote, Eye} from "lucide-react";
import { router } from "@inertiajs/react";

function Name({ name }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">
                {name}
            </span>
        </div>
    );
}

function Type({ type }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">
                {type}
            </span>
        </div>
    );
}

function Price({ price }) {
    return (
        <div className="inline-flex items-center gap-2 text-gray-700">
            <Banknote size={16} className="text-green-500" />
            <span className="font-semibold">R$ {price}</span>
        </div>
    );
}

function Brand({ brand }) {
    return (
        <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">
                {brand}
            </span>
        </div>
    );
}

function Actions({ actions }) {
    return (
        <button
            onClick={() => router.visit(actions[0].route)}
            title="Ver detalhes"
            className="flex items-center font-semibold gap-1 text-gray-700 hover:text-gray-900 transition"
        >
            <Eye size={16} />
            <span>Ver Detalhes</span>
        </button>
    );
}

export default function ProductDataTableRow({ product, headers }) {
    return (
        <tr className="border-t border-gray-400 shadow-gray-300">
            {headers.map((header) => (
                <td key={header.key} className="p-4">
                    {header.key === "name" ? (
                        <Name name={product.name} />
                    ) : header.key === "brand" ? (
                        <Brand brand={product.brand} />
                    ) : header.key === "type" ? (
                        <Type type={product.type} />
                    ) : header.key === "price" ? (
                        <Price price={product.price} />
                    ) : header.key === "actions" ? (
                        <Actions actions={product.actions} />
                    ) : (
                        product[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
