import CustomerSearchFilterButton from "@/Components/Customer/Index/UI/CustomerSearchParameters";
import LoadingSpinner from "@/Components/Customer/Index/UI/LoadingSpinner";
import PageNavigator from "@/Components/Customer/Index/UI/PageNavigator";
import SearchBar from "@/Components/UI/DataTableUI/SearchBar";
import { useToast } from "@/Contexts/ToastContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import EmployeeDataTableRow from "../UI/EmployeeDataTableRow";

export default function EmployeeDataTableSection({ dataTableUrl }) {
    const { error } = useToast();
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});

    const spinnerTimeoutRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [page, search, filters]);

    const fetchData = async () => {
        setLoading(true);
        setShowSpinner(false);

        spinnerTimeoutRef.current = setTimeout(() => {
            setShowSpinner(true);
        }, 300);

        try {
            const response = await axios.get(dataTableUrl, {
                params: { page, perPage, search, ...filters },
            });
            setEmployees(response.data.data);
            setHeaders(response.data.headers);
            setTotalPages(response.data.lastPage);
        } catch (e) {
            error("Erro ao buscar dados dos Funcionarios");
        } finally {
            clearTimeout(spinnerTimeoutRef.current);
            setShowSpinner(false);
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const onClearSerchBar = () => {
        setSearch("");
        setPage(1);
    };

    return (
        <div className="mt-8">
            <div className="border shadow-md rounded-2xl p-4 border-gray-300 bg-white">
                <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="flex-grow">
                        <SearchBar
                            search={search}
                            onSearchChange={handleSearchChange}
                            onClear={onClearSerchBar}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto relative min-h-[150px]">
                    <table className="min-w-full table-fixed border-collapse w-full">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header.key}
                                        className="px-4 py-2 text-left text-lg w-1/4"
                                    >
                                        <span>{header.label}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {employees.length === 0 && !loading ? (
                                <tr>
                                    <td
                                        colSpan={headers.length}
                                        className="text-center py-8 text-gray-500 italic select-none border-t border-gray-400"
                                    >
                                        Nenhum funcionario encontrado.
                                    </td>
                                </tr>
                            ) : (
                                employees.map((employee) => (
                                    <EmployeeDataTableRow
                                        key={employee.id}
                                        employee={employee}
                                        headers={headers}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>

                    {showSpinner && <LoadingSpinner />}
                </div>
            </div>

            <PageNavigator
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}
