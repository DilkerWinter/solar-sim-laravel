import { Building, Clock, FileBarChart, Users, Zap } from "lucide-react";
import CustomerInfoCard from "../UI/CustomerInfoCard";

export default function CustomerInfoResume() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                <CustomerInfoCard
                    label="Total de Clientes"
                    url={"/customers/count"}
                    icon={Users}
                    colorClass="text-blue-600"
                />

                <CustomerInfoCard
                    label="Total de Residencias"
                    url={"/address/count"}
                    icon={Building}
                    colorClass="text-purple-600"
                />

                <CustomerInfoCard
                    label="Propostas Pendentes"
                    value={100}
                    icon={Clock}
                    colorClass="text-yellow-600"
                />

                <CustomerInfoCard
                    label="Propostas Finalizadas"
                    value={20}
                    icon={FileBarChart}
                    colorClass="text-green-600"
                />


                
            </div>
    );
}