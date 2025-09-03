import TextField from "@/Components/UI/Fields/TextField";
import EditableField from "@/Components/UI/Inputs/EditableField";
import InputField from "@/Components/UI/Inputs/InputField";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import { formatDecimal } from "@/Utils/formatNumber";

export default function SolarPanelCard({ inverter, setInverter, isEditing }) {
    const inverterTypeOptions = [
        { value: "Microinversor", label: "Microinversor" },
        { value: "Bifásico", label: "Bifásico" },
        { value: "Trifásico", label: "Trifásico" },
        { value: "Hibrido", label: "Hibrido" },
    ];

    const operateVoltageOptions = [
        { value: "110", label: "110V" },
        { value: "220", label: "220V" },
    ];

    const onChange = (field, value) => {
        setInverter((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-yellow-100 text-yellow-700">
                    <h2 className="font-semibold text-lg">Informações do Inversor</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                {isEditing ? (
                    <>
                        <SelectField
                            label="Tipo"
                            name="type"
                            value={inverter.type ?? ""}
                            onChange={(value) => onChange("type", value)}
                            options={inverterTypeOptions}
                            placeholder="Selecione o tipo do inversor"
                        />
                        <EditableField
                            required
                            label="Quantidade de Painéis Suportados"
                            name="supported_panel_count"
                            type="number"
                            value={inverter.supported_panel_count ?? ""}
                            onChange={(e) => onChange("supported_panel_count", e.target.value)}
                        />
                        <InputField
                            required
                            label="Potência Máxima dos Painéis Suportados"
                            name="supported_panel_max_power_watts"
                            value={formatDecimal(inverter.supported_panel_max_power_watts) ?? ""}
                            onChange={(e) => onChange("supported_panel_max_power_watts", e.target.value)}
                            suffix="W"
                        />
                        <InputField
                            required
                            label="Potência Máxima"
                            name="max_power_watts"
                            value={formatDecimal(inverter.max_power_watts) ?? ""}
                            onChange={(e) => onChange("max_power_watts", e.target.value)}
                            suffix="W"
                        />
                        <SelectField
                            label="Tensão de Operação"
                            name="operating_voltage"
                            value={inverter.operating_voltage ?? ""}
                            onChange={(value) => onChange("operating_voltage", value)}
                            options={operateVoltageOptions}
                            placeholder="Selecione a voltagem do inversor"
                        />
                    </>
                ) : (
                    <>
                        <TextField label="Tipo" value={inverter.type} />
                        <TextField label="Quantidade de Painéis Suportados" value={inverter.supported_panel_count} />
                        <TextField label="Potência Máxima dos Painéis Suportados" value={`${inverter.supported_panel_max_power_watts_formatted} W`} />
                        <TextField label="Potência Máxima" value={`${inverter.max_power_watts_formatted} W`} />
                        <TextField label="Tensão de Operação" value={`${inverter.operating_voltage} V`} />
                    </>
                )}
            </div>
        </div>
    );
}
