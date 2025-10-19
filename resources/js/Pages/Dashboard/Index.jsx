import { LastCustomers } from "@/Components/Dashboard/LastCustomers";
import { TotalProposals } from "@/Components/Dashboard/TotalProposals";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="col-span-2">
        <TotalProposals />
      </div>
      
      <div className="col-span-1">
        <LastCustomers />
      </div>
      
      <div className="col-span-3">
        {/* Conteúdo futuro aqui */}
      </div>
    </div>
  );
}