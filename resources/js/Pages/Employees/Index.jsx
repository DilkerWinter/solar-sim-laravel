import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import EmployeeDataTableSection from "@/Components/Employee/Index/Sections/EmployeeDataTableSection";
import EmployeesIndexHeader from "@/Components/Employee/Index/Sections/EmployeeIndexHeader";
import AppLayout from "@/Layouts/AppLayout";

export default function Index({ employeeDataTableUrl }) {
    return (
        <div className="w-full mx-auto p-8">
            <EmployeesIndexHeader />
            <EmployeeDataTableSection dataTableUrl={employeeDataTableUrl} />
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