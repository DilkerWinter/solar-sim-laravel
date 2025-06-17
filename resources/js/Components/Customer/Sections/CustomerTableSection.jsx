import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerTableSection({ dataTableUrl }) {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [search, setSearch] = useState("");

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(dataTableUrl, {
                params: {
                    page,
                    perPage,
                    search,
                },
            });

            setCustomers(response.data.data);
            setHeaders(response.data.headers);
            setTotalPages(response.data.lastPage);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
        setLoading(false);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // volta para a primeira página ao pesquisar
    };

    return (
        <div className="mt-8">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    className="px-4 py-2 border rounded w-full md:w-1/3"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="overflow-x-auto">
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <table className="min-w-full border rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header.key}
                                        className={`text-left px-4 py-2 ${
                                            header.class || ""
                                        }`}
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan={headers.length} className="text-center py-4">
                                        Nenhum resultado encontrado.
                                    </td>
                                </tr>
                            ) : (
                                customers.map((row) => (
                                    <tr key={row.id} className="border-t hover:bg-gray-50">
                                        {headers.map((header) => (
                                            <td key={header.key} className="px-4 py-2">
                                                {header.key === "actions" ? (
                                                    <div className="flex gap-2">
                                                        {row.actions.map((action, idx) => (
                                                            <button
                                                                key={idx}
                                                                className="text-blue-600 hover:underline"
                                                                onClick={() =>
                                                                    console.log("Ação:", action)
                                                                }
                                                            >
                                                                <i className={action.icon}></i>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    row[header.key]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Paginação */}
            <div className="flex justify-center mt-4 gap-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 border rounded ${
                            page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
