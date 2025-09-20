import { AdminPanelHeader } from "@/Components/AdminPanel/Sections/AdminPanelHeader";
import { ProductTypeSection } from "@/Components/AdminPanel/Sections/ProductType/ProductTypeSection";

export default function Index({ productTypeDataTableUrl = "/product-types/datatable" }) {
    console.log(productTypeDataTableUrl)
    return (
        <div className="w-full mx-auto p-8">
            <AdminPanelHeader/>
            <ProductTypeSection dataTableUrl={productTypeDataTableUrl}/>
        </div>
    )
}