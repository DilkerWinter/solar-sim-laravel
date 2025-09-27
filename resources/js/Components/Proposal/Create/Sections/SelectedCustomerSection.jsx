import TextField from "@/Components/UI/Fields/TextField";
import { capitalize } from "@/Utils/capitalize";

export function SelectedCustomerSection({ selectedCustomer, selectedAddress }) {
    console.log(selectedAddress);
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold border-b pb-1 mb-4">
                Dados completos do Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <TextField label="Nome" value={selectedCustomer.name} />
                <TextField label="Telefone" value={selectedCustomer.phone} />
                <TextField label="Email" value={selectedCustomer.email} />
                <TextField
                    label="Documento"
                    value={selectedCustomer.document_number}
                />
            </div>

            <h3 className="text-lg font-semibold border-b pb-1 mb-4 mt-4">
                Dados do Endereço
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <TextField label="Rua" value={selectedAddress.street} />
                <TextField label="Numero" value={selectedAddress.number} />
                <TextField
                    label="Bairro"
                    value={selectedAddress.neighborhood}
                />
                <TextField label="CEP" value={selectedAddress.cep} />
                <TextField label="Cidade" value={selectedAddress.city} />
                <TextField label="Estado" value={selectedAddress.state} />
                <TextField
                    label="Tipo de localidade"
                    value={capitalize(selectedAddress.type)}
                />
                <TextField
                    label="Tipo de instalação"
                    value={capitalize(selectedAddress.roof_type)}
                />
            </div>

            <h3 className="text-lg font-semibold border-b pb-1 mb-4 mt-4">
                Detalhes de Energia
            </h3>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                    label="Média de consumo anual"
                    value={`${selectedAddress.energy_info.average_annual_consumption_kwh_formatted} kWh`}
                />
                <TextField
                    label="Valor médio da conta de luz"
                    value={`R$ ${selectedAddress.energy_info.average_energy_bill_formatted}`}
                />
                <TextField
                    label="Provedor de energia"
                    value={selectedAddress.energy_info.energy_provider}
                />
                <div className="col-span-full">
                    <TextField
                        label="Observação"
                        value={selectedAddress.energy_info.notes}
                    />
                </div>
            </div>
        </div>
    );
}
