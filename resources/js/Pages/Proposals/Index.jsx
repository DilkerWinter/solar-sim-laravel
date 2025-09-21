import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import ProposalIndexHeader from "@/Components/Proposal/Sections/ProposalIndexHeader";
import ProposalInfoResume from "@/Components/Proposal/Sections/ProposalInfoResume";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ proposalDataTableUrl }) {
    return (
        <div className="w-full mx-auto p-8">
            <ProposalIndexHeader />
            <ProposalInfoResume />
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