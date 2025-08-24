import InfoResumeCard from "@/Components/UI/Cards/CustomerInfoCard";
import { Building, Clock, FileBarChart, Users} from "lucide-react";

export default function ProductInfoResume() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                <InfoResumeCard
                    label="Total de Produtos"
                    url={"/customers/count"}
                    icon={Users}
                    colorClass="text-blue-600"
                />

                <InfoResumeCard
                    label="Total de Placas Solares"
                    url={"/address/count"}
                    icon={Building}
                    colorClass="text-purple-600"
                />

                <InfoResumeCard
                    label="Total de Inversores"
                    value={100}
                    icon={Clock}
                    colorClass="text-yellow-600"
                />

                <InfoResumeCard
                    label="Categorias de Produtos"
                    value={20}
                    icon={FileBarChart}
                    colorClass="text-green-600"
                />


                
            </div>
    );
}