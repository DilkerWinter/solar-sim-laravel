import SelectField from "@/Components/UI/Inputs/SelectInput";
import { api } from "@/Utils/api";
import { useToast } from "@/Contexts/ToastContext";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SelectedKitSection } from "./SelectedKitSection";
import { formatDecimal } from "@/Utils/formatNumber";

export function KitSection({ formData, setFormData, kitOptions }) {
    const { error } = useToast();
    const [selectedKit, setSelectedKit] = useState({});
    const [isOpen, setIsOpen] = useState(true);
    const [height, setHeight] = useState("auto");
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                const scrollHeight = contentRef.current.scrollHeight;
                setHeight(scrollHeight + "px");
            } else {
                setHeight("0px");
            }
        }
    }, [isOpen, selectedKit]);

    const handleSelectKit = async (kitId) => {
        if (!kitId) return;

        try {
            const response = await api.get(route("kits.show", kitId));
            const kitData = response.data;
            setSelectedKit(kitData);
            setFormData({ ...formData, kit_id: kitData.id, final_price: formatDecimal(kitData.total_price)
             });
        } catch (e) {
            error("Erro ao buscar kit");
        }
    };

    return (
        <div className="border rounded-md overflow-hidden shadow-sm mt-8">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                aria-expanded={isOpen}
                aria-controls="kit-content"
            >
                <h2 className="text-lg font-semibold text-left text-gray-800">
                    Kit Solar
                </h2>
                <div className="transform transition-transform duration-300 ease-in-out">
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                </div>
            </button>

            <div
                id="kit-content"
                ref={contentRef}
                className="transition-all duration-250 ease-in-out overflow-hidden"
                style={{ height: height }}
            >
                <div className="px-4 py-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField
                            label="Selecione o Kit Solar"
                            name="kit_id"
                            value={selectedKit?.id || ""}
                            onChange={handleSelectKit}
                            options={kitOptions?.map((kit) => ({
                                value: kit.id,
                                label: kit.label,
                            }))}
                            required
                        />
                    </div>

                    {selectedKit?.id && (
                        <SelectedKitSection selectedKit={selectedKit} />
                    )}
                </div>
            </div>
        </div>
    );
}
