import SelectField from "@/Components/UI/Inputs/SelectInput";
import { api } from "@/Utils/api";
import { useToast } from "@/Contexts/ToastContext";
import { useState } from "react";

export function KitSection({ formData, setFormData, kitOptions }) {
    const { error } = useToast();
    const [selectedKit, setSelectedKit] = useState({});

    const handleSelectKit = async (kitId) => {
        if (!kitId) return;

        try {
            const response = await api.get(route("kits.show", kitId));
            const kitData = response.data;
            setSelectedKit(kitData);
            setFormData({ ...formData, kit_id: kitData.id });
        } catch (e) {
            error("Erro ao buscar kit");
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl mb-4">Kit Solar</h2>
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
    );
}
