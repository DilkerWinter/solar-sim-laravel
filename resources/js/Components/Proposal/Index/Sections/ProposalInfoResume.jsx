import InfoResumeCard from "@/Components/UI/Cards/InfoResumeCard";
import { X, Check, Clock } from "lucide-react";

export default function ProposalInfoResume() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <InfoResumeCard
                label="Propostas Pendentes"
                url={"/proposals/count/Pendente"}
                icon={Clock}
                colorClass="text-yellow-600"
            />
            <InfoResumeCard
                label="Propostas Aprovadas"
                url={"/proposals/count/Aprovada"}
                icon={Check}
                colorClass="text-green-600"
            />
            <InfoResumeCard
                label="Propostas Rejeitadas"
                url={"/proposals/count/Rejeitada"}
                icon={X}
                colorClass="text-red-600"
            />
        </div>
    );
}