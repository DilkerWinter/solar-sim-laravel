import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";
import { ArrowRight, FileText, TrendingUp } from "lucide-react";
import { router } from "@inertiajs/react";

export function TotalProposals() {
    const proposalsData = [
        { name: "Aprovadas", value: 145, status: "Aprovadas" },
        { name: "Pendentes", value: 89, status: "Pendentes" },
        { name: "Rejeitadas", value: 34, status: "Rejeitadas" },
    ];

    const COLORS = {
        Aprovadas: "#22c55e",
        Pendentes: "#eab308",
        Rejeitadas: "#ef4444",
    };

    const totalProposals = proposalsData.reduce(
        (sum, item) => sum + item.value,
        0
    );

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            const percentage = ((data.value / totalProposals) * 100).toFixed(1);
            return (
                <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">
                        {data.name}
                    </p>
                    <p className="text-sm text-gray-600">
                        {data.value} propostas ({percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    const CustomLegend = ({ payload }) => {
        return (
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-700">
                            {entry.value}
                            <span className="font-semibold ml-1">
                                ({entry.payload.value})
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Status das Propostas
                </h2>
                <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                        {totalProposals} total
                    </span>
                </div>
            </div>

            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={proposalsData}
                            cx="50%"
                            cy="45%"
                            labelLine={false}
                            label={({ percent }) =>
                                `${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {proposalsData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[entry.status]}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4">
                <button
                    onClick={() => router.visit(route("proposals.index"))}
                    className="w-full text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 py-2"
                >
                    Ver todas as propostas
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
