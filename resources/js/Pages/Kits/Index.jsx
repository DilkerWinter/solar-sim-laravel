import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import KitDataTableSection from "@/Components/Kit/Index/Sections/KitDataTableSection";
import KitIndexHeader from "@/Components/Kit/Index/Sections/KitIndexHeader";
import KitInfoResume from "@/Components/Kit/Index/Sections/KitInfoResume";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ kitDataTableUrl }) {
    return (
        <div className="w-full mx-auto p-8">
            <KitIndexHeader />
            <KitInfoResume />
            <KitDataTableSection dataTableUrl={kitDataTableUrl} />
        </div>
    );
}

Index.layout = (page) => (
  <AppLayout breadcrumb={<CustomBreadcrumb
  items={[
    { name: "Início", href: "/dashboard" },
    { name: "Kits" },
  ]}
/>
}>{page}</AppLayout>
);