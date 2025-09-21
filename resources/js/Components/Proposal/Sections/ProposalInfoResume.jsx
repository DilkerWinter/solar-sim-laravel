import InfoResumeCard from "@/Components/UI/Cards/CustomerInfoCard";
import { Building, Clock, File, FileBarChart, List, ListCollapse, Package, Sun, Users, Zap } from "lucide-react";

export default function ProposalInfoResume() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <InfoResumeCard
                label="Total de Produtos"
                url={"/products/count"}
                icon={Package}
                colorClass="text-blue-600"
            />

        </div>
    );
}