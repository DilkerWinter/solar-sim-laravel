import SearchBar from "@/Components/UI/DataTableUI/SearchBar";
import { useToast } from "@/Contexts/ToastContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import ProductTypeDataTableRow from "../../UI/ProductTypeDataTableRow";
import RedirectButton from "@/Components/UI/Buttons/CreateRedirectButton";
import CreateProductTypeModal from "@/Components/Employee/Index/UI/CreateProductTypeModal";
import LoadingSpinner from "@/Components/UI/DataTableUI/LoadingSpinner";
import PageNavigator from "@/Components/UI/DataTableUI/PageNavigator";

export default function ProductTypeDataTableSection({ dataTableUrl }) {
    const { error } = useToast();
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [productTypes, setProductTypes] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            setProductTypes(response.data.data);
            setHeaders(response.data.headers);
            setTotalPages(response.data.lastPage);
        } catch (e) {
            error("Erro ao buscar dados dos Categoria de Produtos");
        } finally {
            if (spinnerTimeoutRef.current)
                clearTimeout(spinnerTimeoutRef.current);
            setShowSpinner(false);
            setLoading(false);
        }
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
                    <div className="flex gap-3">
                        <RedirectButton
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Categoria de Produto
                        </RedirectButton>
                    </div>
                </div>

                <div className="overflow-x-auto relative min-h-[150px]">
                    <table className="min-w-full table-fixed border-collapse w-full">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header.key}
                                        className={`px-4 py-2 text-left text-lg ${
                                            header.key === "actions"
                                                ? "w-[15%]"
                                                : "w-auto"
                                        }`}
                                    >
                                        <span>{header.label}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {productTypes.length === 0 && !loading ? (
                                <tr>
                                    <td
                                        colSpan={headers.length}
                                        className="text-center py-8 text-gray-500 italic select-none border-t border-gray-400"
                                    >
                                        Nenhum Categoria de Produto encontrado.
                                    </td>
                                </tr>
                            ) : (
                                productTypes.map((productType) => (
                                    <ProductTypeDataTableRow
                                        key={productType.id}
                                        productType={productType}
                                        headers={headers}
                                        refreshData={fetchData}
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

            <CreateProductTypeModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                refreshData={fetchData}
            />
        </div>
    );
}
