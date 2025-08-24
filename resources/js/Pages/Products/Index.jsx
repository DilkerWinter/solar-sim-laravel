import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import CustomerDataTableSection from "@/Components/Customer/Index/Sections/CustomerDataTableSection";
import CustomerInfoResume from "@/Components/Customer/Index/Sections/CustomerInfoResume";
import ProductIndexHeader from "@/Components/Product/Index/Sections/ProductIndexHeader";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ productDataTableUrl }) {
    return (
        <div className="w-full mx-auto p-8">
            <ProductIndexHeader />

            <CustomerInfoResume/>

            {/* <CustomerDataTableSection dataTableUrl={productDataTableUrl} /> */}
        </div>
    );
}

Index.layout = (page) => (
  <AppLayout breadcrumb={<CustomBreadcrumb
  items={[
    { name: "Início", href: "/dashboard" },
    { name: "Produtos" },
  ]}
/>
}>{page}</AppLayout>
);