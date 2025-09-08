import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import KitIndexHeader from "@/Components/Kit/Index/Sections/KitIndexHeader";
import AppLayout from "@/Layouts/AppLayout";

export default function Index() {
    return (
        <div className="w-full mx-auto p-8">
            <KitIndexHeader />

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