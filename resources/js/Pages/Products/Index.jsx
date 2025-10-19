import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import ProductDataTableSection from "@/Components/Product/Index/Sections/ProductDataTableSection";
import ProductIndexHeader from "@/Components/Product/Index/Sections/ProductIndexHeader";
import ProductInfoResume from "@/Components/Product/Index/Sections/ProductInfoResume";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ productDataTableUrl }) {
    return (
        <div className="w-full mx-auto p-8">
            <ProductIndexHeader />

            <ProductInfoResume/>

            <ProductDataTableSection dataTableUrl={productDataTableUrl} />
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