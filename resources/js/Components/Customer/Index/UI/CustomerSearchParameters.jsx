import { useState, useRef, useEffect } from "react";

export default function CustomerSearchFilterButton({ onFilter }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [onlyWithoutAddresses, setOnlyWithoutAddresses] = useState(false);
    const [onlyWithEnergyInfo, setOnlyWithEnergyInfo] = useState(false);

    const addressTypes = ["residencial", "comercial", "industrial", "rural"];

    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState("left");

    const toggleType = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
    };

    const clearFilters = () => {
        setSelectedTypes([]);
        setOnlyWithoutAddresses(false);
        setOnlyWithEnergyInfo(false);
        onFilter({});
        setIsOpen(false);
    };

    const applyFilters = () => {
        const hasFilters =
            selectedTypes.length > 0 ||
            onlyWithoutAddresses ||
            onlyWithEnergyInfo;

        const payload = hasFilters
            ? {
                  types: selectedTypes,
                  withoutAddress: onlyWithoutAddresses,
                  withoutEnergyInfo: onlyWithEnergyInfo,
              }
            : {};

        onFilter(payload);
        setIsOpen(false);
    };

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
            const menuWidth = 400;
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
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-2xl hover:bg-gray-300 transition focus:outline-none border border-gray-300"
            >
                Filtrar Clientes
            </button>

            {isOpen && (
                <div
                    className={`absolute mt-3 w-[400px] bg-white border border-gray-300 rounded-xl shadow-2xl z-50 p-6 space-y-6 transition-all duration-300 ${
                        menuPosition === "left" ? "left-0" : "right-0"
                    }`}
                    style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                        Filtros de Cliente
                    </h2>

                    <div>
                        <h3 className="text-gray-700 font-semibold text-sm mb-2">
                            Tipo de Endereço
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                            {addressTypes.map((type) => (
                                <label
                                    key={type}
                                    className="flex items-center gap-2 text-gray-700 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        className="accent-blue-600"
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => toggleType(type)}
                                    />
                                    <span className="capitalize">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <hr className="border-t border-gray-300" />

                    {/* Filtros adicionais */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 text-gray-700 text-sm">
                            <input
                                type="checkbox"
                                className="accent-blue-600"
                                checked={onlyWithoutAddresses}
                                onChange={() =>
                                    setOnlyWithoutAddresses(
                                        !onlyWithoutAddresses
                                    )
                                }
                            />
                            <span>
                                Somente clientes <strong>sem endereço</strong>
                            </span>
                        </label>

                        <label className="flex items-center gap-3 text-gray-700 text-sm">
                            <input
                                type="checkbox"
                                className="accent-blue-600"
                                checked={onlyWithEnergyInfo}
                                onChange={() =>
                                    setOnlyWithEnergyInfo(!onlyWithEnergyInfo)
                                }
                            />
                            <span>
                                Filtrar endereços <strong>sem dados de energia</strong>
                            </span>
                        </label>
                    </div>

                    <div className="flex justify-between gap-4 pt-2">
                        <button
                            onClick={clearFilters}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-2xl hover:bg-gray-300 transition focus:outline-none border border-gray-300"
                        >
                            Limpar
                        </button>
                        <button
                            onClick={applyFilters}
                            className="flex-1 bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-700 transition focus:outline-none "
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
