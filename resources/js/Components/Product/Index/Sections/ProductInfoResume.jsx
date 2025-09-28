import InfoResumeCard from "@/Components/UI/Cards/InfoResumeCard";
import { Building, Clock, File, FileBarChart, List, ListCollapse, Package, Sun, Users, Zap } from "lucide-react";

export default function ProductInfoResume() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <InfoResumeCard
                label="Total de Produtos"
                url={"/products/count"}
                icon={Package}
                colorClass="text-blue-600"
            />

            <InfoResumeCard
                label="Total de Placas Solares"
                url={"/products/count?type=Placa%20Solar"}
                icon={Sun}
                colorClass="text-purple-600"
            />

            <InfoResumeCard
                label="Total de Inversores"
                url={"/products/count?type=Inversor"}
                icon={Zap}
                colorClass="text-yellow-600"
            />

            <InfoResumeCard
                label="Categorias de Produtos"
                url={"/products-types-count"}
                icon={List}
                colorClass="text-green-600"
            />



        </div>
    );
}