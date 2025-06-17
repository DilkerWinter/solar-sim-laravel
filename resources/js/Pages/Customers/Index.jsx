import CustomerIndexHeader from "@/Components/Customer/Sections/CustomerIndexHeader";
import CustomerInfoResume from "@/Components/Customer/Sections/CustomerInfoResume";
import CustomerTableSection from "@/Components/Customer/Sections/CustomerTableSection";

export default function Index({ customers = [] }) {
    const totalCustomers = customers.length;
    const totalAddress = customers.reduce((count, customer) => {
        return count + (customer.addresses?.length || 0);
    }, 0);

    return (
        <div className="w-full mx-auto p-8 ">
            <CustomerIndexHeader />
            <CustomerInfoResume
                totalCustomers={totalCustomers}
                totalAddress={totalAddress}
            />
            <CustomerTableSection/>
        </div>
    );
}
