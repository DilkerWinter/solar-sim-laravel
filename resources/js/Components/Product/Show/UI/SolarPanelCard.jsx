import EditableField from "@/Components/UI/Inputs/EditableField";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import TextField from "@/Components/UI/Fields/TextField";
import InputField from "@/Components/UI/Inputs/InputField";
import { formatDecimal } from "@/Utils/formatNumber";

export default function SolarPanelCard({ product, setProduct, isEditing }) {
    const { solar_panel } = product;

    const operateVoltageOptions = [
        { value: "12", label: "12V" },
        { value: "24", label: "24V" },
    ];

    const onChange = (field, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            solar_panel: {
                ...prevProduct.solar_panel,
                [field]: value,
            },
        }));
    };

    return (
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-yellow-100 text-yellow-700">
                    <h2 className="font-semibold text-lg">Informações do Painel Solar</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                {isEditing ? (
                    <>
                        <InputField
                            required
                            label="Potência"
                            name="potency_watts"
                            type="text"
                            value={formatDecimal(solar_panel.potency_watts) ?? ""}
                            onChange={(e) => onChange("potency_watts", e.target.value)}
                            suffix="W"
                        />
                        <InputField
                            required
                            label="Eficiência"
                            name="efficiency_percentage"
                            type="text"
                            value={formatDecimal(solar_panel.efficiency_percentage) ?? ""}
                            onChange={(e) => onChange("efficiency_percentage", e.target.value)}
                            suffix="%"
                        />
                        <InputField
                            required
                            label="Energia Diária Média"
                            name="average_daily_energy_wh"
                            type="text"
                            value={formatDecimal(solar_panel.average_daily_energy_wh) ?? ""}
                            onChange={(e) => onChange("average_daily_energy_wh", e.target.value)}
                            suffix="Wh"
                        />
                        <InputField
                            required
                            label="Temperatura Máxima de Operação"
                            name="max_operating_temperature"
                            type="text"
                            value={formatDecimal(solar_panel.max_operating_temperature) ?? ""}
                            onChange={(e) => onChange("max_operating_temperature", e.target.value)}
                            suffix="°C"
                        />
                        <SelectField
                            label="Tensão de Operação"
                            name="operating_voltage"
                            value={solar_panel.operating_voltage ?? ""}
                            onChange={(value) => onChange("operating_voltage", value)}
                            options={operateVoltageOptions}
                            placeholder="Selecione a voltagem da placa"
                        />
                        <InputField
                            required
                            label="Altura"
                            name="height"
                            type="text"
                            value={formatDecimal(solar_panel.height) ?? ""}
                            onChange={(e) => onChange("height", e.target.value)}
                            suffix="M"
                        />
                        <InputField
                            required
                            label="Largura"
                            name="width"
                            type="text"
                            value={formatDecimal(solar_panel.width) ?? ""}
                            onChange={(e) => onChange("width", e.target.value)}
                            suffix="M"
                        />
                        <InputField
                            required
                            label="Peso"
                            name="weight"
                            type="text"
                            value={formatDecimal(solar_panel.weight) ?? ""}
                            onChange={(e) => onChange("weight", e.target.value)}
                            suffix="Kg"
                        />
                    </>
                ) : (
                    <>
                        <TextField label="Potência" value={`${solar_panel.potency_watts} W`} />
                        <TextField label="Eficiência" value={`${solar_panel.efficiency_percentage} %`} />
                        <TextField label="Energia Diária Média" value={`${solar_panel.average_daily_energy_wh} Wh`} />
                        <TextField label="Temperatura Máxima de Operação" value={`${solar_panel.max_operating_temperature} °C`} />
                        <TextField label="Tensão de Operação" value={`${solar_panel.operating_voltage} V`} />
                        <TextField label="Altura" value={`${solar_panel.height} M`} />
                        <TextField label="Largura" value={`${solar_panel.width} M`} />
                        <TextField label="Peso" value={`${solar_panel.weight} Kg`} />
                    </>
                )}
            </div>
        </div>
    );
}
