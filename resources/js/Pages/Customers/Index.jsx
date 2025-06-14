import CustomerIndexHeader from "@/Components/Customer/Sections/CustomerIndexHeader";
import CustomerInfoResume from "@/Components/Customer/Sections/CustomerInfoResume";

export default function Index({ customers = [] }) {
    const totalCustomers = customers.length;
    const totalAddress = customers.reduce((acc, customer) => {
        return acc + (customer.addresses?.length || 0);
    }, 0);

    return (
        <div className="w-full mx-auto p-8 ">
            <CustomerIndexHeader />
            <CustomerInfoResume
                totalCustomers={totalCustomers}
                totalAddress={totalAddress}
            />
        </div>
    );
}
