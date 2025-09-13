import InfoResumeCard from "@/Components/UI/Cards/CustomerInfoCard";
import { Package } from "lucide-react";

export default function KitInfoResume() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 max-w-72">
                <InfoResumeCard
                    label="Total de Kits"
                    url={"/kits/count"}
                    icon={Package}
                    colorClass="text-blue-600"
                />
            </div>
    );
}