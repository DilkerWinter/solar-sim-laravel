import TextField from "@/Components/UI/Fields/TextField";
import InputField from "@/Components/UI/Inputs/InputField";
import { formatDecimal } from "@/Utils/formatNumber";

export function ProposalSection({ formData, setFormData }) {

    function handleChange(e) {
        const { name, value: rawValue } = e.target;
        let value = rawValue;

        if (name === "final_price") {
            value = formatDecimal(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="px-4 py-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Preço"
                    name="final_price"
                    type="text"
                    required
                    value={formData.final_price}
                    onChange={handleChange}
                    prefix="R$"
                />

                <InputField
                    label="Observações"
                    name="observation"
                    onChange={handleChange}
                    textarea
                    optional
                />
            </div>
        </div>
    );
}
