import { AdminPanelHeader } from "@/Components/AdminPanel/Sections/AdminPanelHeader";
import { ProductTypeSection } from "@/Components/AdminPanel/Sections/ProductType/ProductTypeSection";
import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ productTypeDataTableUrl = "/product-types/datatable" }) {
    return (
        <div className="w-full mx-auto p-8">
            <AdminPanelHeader/>
            <ProductTypeSection dataTableUrl={productTypeDataTableUrl}/>
        </div>
    )
}


Index.layout = (page) => (
  <AppLayout breadcrumb={<CustomBreadcrumb
    items={[
      { name: "Início", href: "/dashboard" },
      { name: "Painel de Administrador" },
    ]}
  />
  }>{page}</AppLayout>
);