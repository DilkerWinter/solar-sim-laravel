import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import EmployeesIndexHeader from "@/Components/Employee/Index/Sections/EmployeeIndexHeader";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ employees }) {
    return (
        <div className="w-full mx-auto p-8">
            <EmployeesIndexHeader />
        </div>
    );
}

Index.layout = (page) => (
  <AppLayout breadcrumb={<CustomBreadcrumb
  items={[
    { name: "Início", href: "/dashboard" },
    { name: "Funcionarios" },
  ]}
/>
}>{page}</AppLayout>
);