import { useState } from "react";
import { Banknote, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { router } from "@inertiajs/react";
import { capitalize } from "@/Utils/capitalize";
import ConfirmModal from "@/Components/UI/Modal/ConfirmModal";

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
    const color =
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

export default function ProposalDataTableRow({ proposal, headers }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [actionToConfirm, setActionToConfirm] = useState(null);

    const handleActionClick = (action) => {
        if (
            action.type === "approve" ||
            action.type === "reject" ||
            action.type === "pending"
        ) {
            setActionToConfirm(action);
            setModalOpen(true);
        } else if (action.type === "download_pdf" && action.route) {
            window.open(action.route, '_blank');
        }
    };

    const handleConfirm = () => {
        if (actionToConfirm?.route) {
            router.visit(actionToConfirm.route, {
                method: actionToConfirm.method || "POST",
            });
        }
        setModalOpen(false);
        setActionToConfirm(null);
    };

    return (
        <>
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
                            <div className="flex gap-2 items-center">
                                {proposal.actions.map((action) => {
                                    const Icon = {
                                        pending: Clock,
                                        approve: CheckCircle,
                                        reject: XCircle,
                                        download_pdf: FileText,
                                    }[action.type];

                                    if (!Icon) return null;

                                    return (
                                        <button
                                            key={action.type}
                                            onClick={() =>
                                                handleActionClick(action)
                                            }
                                            className="text-gray-600 hover:text-gray-900"
                                            title={action.type}
                                        >
                                            <Icon size={18} />
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            proposal[header.key]
                        )}
                    </td>
                ))}
            </tr>

            <ConfirmModal
                isOpen={modalOpen}
                title={
                    actionToConfirm?.type === "approve"
                        ? "Confirmar Aprovação"
                        : actionToConfirm?.type === "reject"
                        ? "Confirmar Rejeição"
                        : "Marcar como Pendente"
                }
                message={`Tem certeza que deseja ${
                    actionToConfirm?.type === "approve"
                        ? "aprovar"
                        : actionToConfirm?.type === "reject"
                        ? "rejeitar"
                        : "marcar como pendente"
                } esta proposta?`}
                onConfirm={handleConfirm}
                onClose={() => {
                    setModalOpen(false);
                    setActionToConfirm(null);
                }}
                theme={
                    actionToConfirm?.type === "approve"
                        ? "success"
                        : actionToConfirm?.type === "reject"
                        ? "danger"
                        : "info"
                }
            />
        </>
    );
}
