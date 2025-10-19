import SelectField from "@/Components/UI/Inputs/SelectInput";
import { Filter } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ProductSearchFilterButton({ onFilter }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [productTypes, setProductTypes] = useState([]);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState("left");

    useEffect(() => {
        async function fetchProductTypes() {
            try {
                const response = await axios.get("/product-types");
                console.log(response)
                setProductTypes(
                    response.data.map((type) => ({
                        value: type.id,
                        label: type.name,
                    }))
                );
            } catch (error) {
                console.error("Erro ao buscar tipos de produto:", error);
            }
        }

        fetchProductTypes();
    }, []);

    const clearFilters = () => {
        setSelectedType("");
        onFilter({});
        setIsOpen(false);
    };

    const applyFilters = () => {
        const hasFilters = !!selectedType;

        const payload = hasFilters
            ? {
                  type: selectedType,
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
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-2xl hover:bg-gray-300 transition focus:outline-none border border-gray-300 flex items-center gap-2"
            >
                <Filter className="w-4 h-4" />
                <p>Filtrar Produtos</p>
            </button>

            {isOpen && (
                <div
                    className={`absolute mt-3 w-[400px] bg-white border border-gray-300 rounded-xl shadow-2xl z-50 p-6 space-y-6 transition-all duration-300 ${
                        menuPosition === "left" ? "left-0" : "right-0"
                    }`}
                    style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                        Filtros de Produto
                    </h2>

                    <div>
                        <SelectField
                            label="Categoria"
                            name="productType"
                            options={productTypes}
                            value={selectedType}
                            onChange={(value) => setSelectedType(value)}
                            placeholder="Selecione uma categoria"
                        />
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
