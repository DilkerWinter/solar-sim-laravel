import CustomerIndexHeader from "@/Components/Customer/Sections/CustomerIndexHeader";
import CustomerInfoResume from "@/Components/Customer/Sections/CustomerInfoResume";
import CustomerTableSection from "@/Components/Customer/Sections/CustomerTableSection";

export default function Index({ cardInfos, customerDataTableUrl }) {
    return (
        <div className="w-full mx-auto p-8">
            <CustomerIndexHeader />

            <CustomerInfoResume
                totalCustomers={cardInfos.totalCustomers}
                totalAddress={cardInfos.totalAddresses}
            />

            <CustomerTableSection dataTableUrl={customerDataTableUrl} />
        </div>
    );
}
