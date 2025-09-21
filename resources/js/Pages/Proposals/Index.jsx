import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import KitInfoResume from "@/Components/Kit/Index/Sections/KitInfoResume";
import ProposalIndexHeader from "@/Components/Proposal/Sections/ProposalIndexHeader";
import AppLayout from "@/Layouts/AppLayout";

export default function Index() {
    return (
        <div className="w-full mx-auto p-8">
            <ProposalIndexHeader />
        </div>
    );
}

Index.layout = (page) => (
    <AppLayout breadcrumb={<CustomBreadcrumb
        items={[
            { name: "Início", href: "/dashboard" },
            { name: "Propostas" },
        ]}
    />
    }>{page}</AppLayout>
);