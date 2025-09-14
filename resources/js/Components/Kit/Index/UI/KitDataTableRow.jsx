import { Banknote, Eye } from "lucide-react";
import { router } from "@inertiajs/react";
import { capitalize } from "@/Utils/capitalize";

function Name({ value }) {
    return (
        <div className="flex flex-col">
            <span className="font-semibold text-gray-700">{capitalize(value)}</span>
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

function GeneratedKwh({ value }) {
    return (
        <div className="flex flex-col">
            <span className="font-semibold text-gray-700">{value}</span>
        </div>
    );
}

function Actions({ actions }) {
    return (
        <button
            onClick={() => router.visit(actions[0].route)}
            title="Ver detalhes"
            className="flex items-center font-semibold gap-1 text-gray-600 hover:text-gray-900 transition"
        >
            <Eye size={16} />
            <span>Ver Detalhes</span>
        </button>
    );
}

export default function KitDataTableRow({ kit, headers }) {
    return (
        <tr className="border-t border-gray-400 shadow-gray-300">
            {headers.map((header) => (
                <td key={header.key} className="p-4">
                    {header.key === "name" ? (
                        <Name value={kit.name} />
                    ) : header.key === "generated_kwh" ? (
                        <GeneratedKwh value={kit.generated_kwh} />
                    ) : header.key === "supported_kw" ? (
                        <GeneratedKwh value={kit.supported_kw} />
                    ) : header.key === "total_price" ? (
                        <Price price={kit.total_price} />
                    ) : header.key === "actions" ? (
                        <Actions actions={kit.actions} />
                    ) : (
                        kit[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
