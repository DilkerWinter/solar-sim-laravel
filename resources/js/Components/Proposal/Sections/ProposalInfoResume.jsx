import InfoResumeCard from "@/Components/UI/Cards/InfoResumeCard";
import { X, Check } from "lucide-react";

export default function ProposalInfoResume() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <InfoResumeCard
                label="Propostas Abertas"
                url={"/proposals/count/open"}
                icon={Check}
                colorClass="text-green-600"
            />

            <InfoResumeCard
                label="Propostas Fechadas"
                url={"/proposals/count/closed"}
                icon={X}
                colorClass="text-red-600"
            />

        </div>
    );
}