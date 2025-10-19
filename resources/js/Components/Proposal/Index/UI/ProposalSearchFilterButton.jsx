import { Filter } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const STATUS_OPTIONS = ["Pendente", "Aprovada", "Rejeitada"];

export default function ProposalSearchFilterButton({ onFilter }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectValue, setSelectValue] = useState("");

    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState("left");

    useEffect(() => {
        setSelectedStatus(selectValue);
    }, [selectValue]);

    useEffect(() => {
        onFilter({ status: selectedStatus });
    }, [selectedStatus]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const menuWidth = 300;
            const screenWidth = window.innerWidth;

            setMenuPosition(
                rect.left + menuWidth > screenWidth ? "right" : "left"
            );
        }
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-2xl hover:bg-gray-300 transition focus:outline-none border border-gray-300 flex items-center gap-2"
            >
                <Filter className="w-4 h-4" />
                <p>Filtrar Propostas</p>
            </button>

            {isOpen && (
                <div
                    className={`absolute mt-3 w-[300px] bg-white border border-gray-300 rounded-xl shadow-2xl z-50 p-6 space-y-6 transition-all duration-300 ${
                        menuPosition === "left" ? "left-0" : "right-0"
                    }`}
                >
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                        Filtros de Propostas
                    </h2>

                    <div className="space-y-2">
                        <label
                            htmlFor="status"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Status da Proposta
                        </label>
                        <select
                            id="status"
                            value={selectValue}
                            onChange={(e) => setSelectValue(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none"
                        >
                            {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}
