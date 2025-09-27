import TextField from "@/Components/UI/Fields/TextField";
import { capitalize } from "@/Utils/capitalize";

export function SelectedKitSection({ selectedKit }) {
    console.log(selectedKit);
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold border-b pb-1 mb-4">
                Dados completos do Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <TextField label="Nome" value={selectedKit.name} />
                <TextField label="Descricao" value={selectedKit.phone} />
                <TextField
                    label="Documento"
                    value={selectedCustomer.document_number}
                />
            </div>
        </div>
    );
}
