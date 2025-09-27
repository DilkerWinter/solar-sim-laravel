import RedirectButton from "@/Components/UI/Buttons/CreateRedirectButton";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function ProposalIndexHeader() {
    return (
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Propostas
                </h1>
                <p className="text-gray-600">
                    Gerencie todos as propostas cadastrados no sistema
                </p>
            </div>
            <div className="flex gap-3">
                <RedirectButton
                    onClick={() => router.visit(route("proposals.create"))}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Nova Proposta
                </RedirectButton>
            </div>
        </div>
    );
}
