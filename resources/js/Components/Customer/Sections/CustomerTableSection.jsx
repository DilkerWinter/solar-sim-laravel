import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CustomerDataTableRow from "../UI/CustomerDataTableRow";
import LoadingSpinner from "../UI/LoadingSpinner";
import PageNavigator from "../UI/PageNavigator";

export default function CustomerTableSection({ dataTableUrl }) {
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const spinnerTimeoutRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const fetchData = async () => {
        setLoading(true);
        setShowSpinner(false);

        spinnerTimeoutRef.current = setTimeout(() => {
            setShowSpinner(true);
        }, 300);

        try {
            const response = await axios.get(dataTableUrl, {
                params: { page, perPage, search },
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

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    return (
        <div className="mt-8">
            {/* Container  */}
            <div className="border shadow-md rounded-2xl p-4 border-gray-300">
                {/* Header */}
                <div className="mb-2 ">
                    {/* Search Field */}
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        className="px-4 py-2 border rounded-2xl w-full md:w-1/3"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    {/* Parameters Select */}
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
                                        className="text-center py-4"
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
