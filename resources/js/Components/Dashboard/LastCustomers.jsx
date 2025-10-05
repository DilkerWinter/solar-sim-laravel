import React, { useState, useEffect } from "react";
import { Users, Mail, MapPin, ArrowRight, TrendingUp } from "lucide-react";
import { router } from "@inertiajs/react";
import axios from "axios";

export function LastCustomers() {
    const [lastCustomers, setLastCustomers] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [customersResponse, countResponse] = await Promise.all([
                    axios.get('/customers/dashboard'),
                    axios.get('/customers/count')
                ]);
                
                setLastCustomers(customersResponse.data);
                setTotalCustomers(countResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    Últimos Clientes
                </h2>
                <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                        {totalCustomers} total
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {lastCustomers.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                        Nenhum cliente encontrado
                    </p>
                ) : (
                    lastCustomers.map((customer) => (
                        <div
                            key={customer.id}
                            className="flex items-start gap-2 rounded-lg border-t pt-1"
                        >
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-800 truncate">
                                    {customer.name}
                                </h3>

                                <div className="flex items-center gap-1 mt-1.5">
                                    <Mail className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                    <p className="text-xs text-gray-600 truncate">
                                        {customer.email}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 mt-1.5">
                                    <MapPin className="w-3 h-3 text-green-500 flex-shrink-0" />
                                    <p className="text-xs text-gray-600">
                                        {customer.addresses_count}{" "}
                                        {customer.addresses_count === 1
                                            ? "endereço"
                                            : "endereços"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-shrink-0 text-right">
                                <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
                                    {new Date(customer.created_at).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "short",
                                    })}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-2 pt-2 border-t border-gray-200">
                <button
                    onClick={() => router.visit(route("customers.index"))}
                    className="w-full text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                    Ver todos os clientes
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}