import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import AppLayout from "@/Layouts/AppLayout";

export default function Create() {
    return (
        <>
            Teste
        </>
    );
}

Create.layout = (page) => (
  <AppLayout breadcrumb={<CustomBreadcrumb
  items={[
    { name: "Início", href: "/dashboard" },
    { name: "Kits", href: "/kits" },
    { name: "Cadastro" }
  ]}
/>
}>{page}</AppLayout>
);
