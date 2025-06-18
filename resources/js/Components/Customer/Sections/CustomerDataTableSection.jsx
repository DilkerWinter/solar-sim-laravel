import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CustomerDataTableRow from "../UI/CustomerDataTableRow";
import LoadingSpinner from "../UI/LoadingSpinner";
import PageNavigator from "../UI/PageNavigator";
import CustomerSearchBar from "../UI/CustomerSearchBar";
import CustomerSearchParameters from "../UI/CustomerSearchParameters";

export default function CustomerDataTableSection({ dataTableUrl }) {
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [customers, setCustomers] = useState([]);
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

            setCustomers(response.data.data);
            setHeaders(response.data.headers);
            setTotalPages(response.data.lastPage);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            clearTimeout(spinnerTimeoutRef.current);
            setShowSpinner(false);
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
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
            {/* Container  */}
            <div className="border shadow-md rounded-2xl p-4 border-gray-300 bg-white">
                {/* Header */}
                <div className="mb-2 flex items-center justify-between gap-4">
                    {/* Search Field ocupa o máximo possível */}
                    <div className="flex-grow">
                        <CustomerSearchBar
                            search={search}
                            onSearchChange={handleSearchChange}
                            onClear={onClearSerchBar}
                        />
                    </div>

                    {/* Botão de filtro fica à direita */}
                    <div className="flex-shrink-0">
                        <CustomerSearchParameters
                            onFilter={handleFilterChange}
                        />
                    </div>
                </div>

                {/* Table And Spinner */}
                <div className="overflow-x-auto relative min-h-[150px]">
                    <table className="min-w-full">
                        {/* DataTable Header */}
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header.key}
                                        className={`px-4 py-2 text-left text-lg`}
                                    >
                                        <span className="">{header.label}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* DataTable Body */}
                        <tbody>
                            {customers.length === 0 && !loading ? (
                                <tr>
                                    <td
                                        colSpan={headers.length}
                                        className="text-center py-8 text-gray-500 italic select-none border-t border-gray-400"
                                    >
                                        Nenhum cliente encontrado.
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <CustomerDataTableRow
                                        key={customer.id}
                                        customer={customer}
                                        headers={headers}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Loading Spinner */}
                    {showSpinner && <LoadingSpinner />}
                </div>
            </div>

            {/* Navigator */}
            <PageNavigator
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}
