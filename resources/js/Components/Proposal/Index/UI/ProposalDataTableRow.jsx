import { Banknote, FileText, CheckCircle, XCircle } from "lucide-react";
import { router } from "@inertiajs/react";
import { capitalize } from "@/Utils/capitalize";

function Customer({ name }) {
    return (
        <span className="font-semibold text-gray-700">{capitalize(name)}</span>
    );
}

function Kit({ kit }) {
    return <span className="text-gray-700">{kit?.name || "—"}</span>;
}

function Price({ price }) {
    return (
        <div className="inline-flex items-center gap-2 text-gray-700">
            <Banknote size={16} className="text-green-500" />
            <span className="font-semibold">R$ {price}</span>
        </div>
    );
}

function Status({ status }) {
    let color =
        {
            Pendente: "bg-yellow-100 text-yellow-700 border-yellow-300",
            Aprovada: "bg-green-100 text-green-700 border-green-300",
            Rejeitada: "bg-red-100 text-red-700 border-red-300",
        }[status] || "bg-gray-100 text-gray-700 border-gray-300";

    return (
        <div
            className={`inline-flex items-center px-3 py-1 rounded-2xl text-sm font-medium border ${color}`}
        >
            {status}
        </div>
    );
}

function Actions({ actions }) {
    return (
        <div className="flex gap-2 items-center">
            {actions.map((action) => {
                const Icon = {
                    approve: CheckCircle,
                    reject: XCircle,
                    download_pdf: FileText,
                }[action.type];

                if (!Icon) return null;

                return (
                    <button
                        key={action.type}
                        onClick={() =>
                            action.route
                                ? router.visit(action.route, {
                                      method: action.method || "GET",
                                  })
                                : null
                        }
                        className="text-gray-600 hover:text-gray-900"
                        title={action.type}
                    >
                        <Icon size={18} />
                    </button>
                );
            })}
        </div>
    );
}

export default function ProposalDataTableRow({ proposal, headers }) {
    return (
        <tr className="border-t border-gray-400 shadow-gray-300">
            {headers.map((header) => (
                <td key={header.key} className="p-4 align-middle">
                    {header.key === "name" ? (
                        <Customer name={proposal.name} />
                    ) : header.key === "kit" ? (
                        <Kit kit={proposal.kit} />
                    ) : header.key === "final_price" ? (
                        <Price price={proposal.final_price} />
                    ) : header.key === "status" ? (
                        <Status status={proposal.status} />
                    ) : header.key === "actions" ? (
                        <Actions actions={proposal.actions} />
                    ) : (
                        proposal[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
