import CustomerDataTableSection from "@/Components/Customer/Index/Sections/CustomerDataTableSection";
import CustomerIndexHeader from "@/Components/Customer/Index/Sections/CustomerIndexHeader";
import CustomerInfoResume from "@/Components/Customer/Index/Sections/CustomerInfoResume";

export default function Index({ cardInfos, customerDataTableUrl }) {
    return (
        <div className="w-full mx-auto p-8">
            <CustomerIndexHeader />

            <CustomerInfoResume
                totalCustomers={cardInfos.totalCustomers}
                totalAddress={cardInfos.totalAddresses}
            />

            <CustomerDataTableSection dataTableUrl={customerDataTableUrl} />
        </div>
    );
}
