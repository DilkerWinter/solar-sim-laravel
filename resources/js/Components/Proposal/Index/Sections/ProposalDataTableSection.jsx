import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useToast } from "@/Contexts/ToastContext";
import SearchBar from "@/Components/UI/DataTableUI/SearchBar";
import ProposalDataTableRow from "../UI/ProposalDataTableRow";
import LoadingSpinner from "@/Components/UI/DataTableUI/LoadingSpinner";
import PageNavigator from "@/Components/UI/DataTableUI/PageNavigator";

export default function ProposalDataTableSection({ dataTableUrl }) {
    const { error } = useToast();
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [proposals, setProposals] = useState([]);
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

            setProposals(response.data.data);
            setHeaders(response.data.headers);
            setTotalPages(response.data.lastPage);
        } catch (e) {
            error("Erro ao buscar dados das propostas");
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

    const onClearSearchBar = () => {
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
                            onClear={onClearSearchBar}
                        />
                    </div>

                    <div className="flex-shrink-0">
                        {/* <ProposalSearchFilterButton onFilter={handleFilterChange} /> */}
                    </div>
                </div>

                <div className="overflow-x-auto relative min-h-[150px]">
                    <table className="min-w-full table-fixed border-collapse w-full">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header.key}
                                        className="px-4 py-2 text-left text-lg"
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {proposals.length === 0 && !loading ? (
                                <tr>
                                    <td
                                        colSpan={headers.length}
                                        className="text-center py-8 text-gray-500 italic select-none border-t border-gray-400"
                                    >
                                        Nenhuma proposta encontrada.
                                    </td>
                                </tr>
                            ) : (
                                proposals.map((proposal) => (
                                    <ProposalDataTableRow
                                        key={proposal.id}
                                        proposal={proposal}
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
