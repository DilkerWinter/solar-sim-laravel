import {
    Banknote,
    Building,
    Eye,
    Factory,
    Home,
    House,
    Mail,
    Phone,
    Sprout,
    Zap,
} from "lucide-react";
import CopyToClipboard from "./CopyToClipboard";
import { router } from "@inertiajs/react";

function CustomerInfo({ customer_info = [] }) {
    const [name, email, phone] = customer_info;

    return (
        <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">
                {name || "Nome não disponível"}
            </span>

            <span className="text-gray-600 flex items-center gap-2">
                <Mail size={14} className="text-gray-500" />
                <span>{email || "Email não disponível"}</span>
                {email && <CopyToClipboard text={email} title="Copiar Email" />}
            </span>

            <span className="text-gray-600 flex items-center gap-2">
                <Phone size={14} className="text-gray-500" />
                <span>{phone || "Telefone não disponível"}</span>
                {phone && (
                    <CopyToClipboard text={phone} title="Copiar Telefone" />
                )}
            </span>
        </div>
    );
}

function AddressInfo({ address_info }) {
    const { count, types } = address_info;

    return (
        <div className="space-y-2 text-gray-700">
            <div className="flex items-center gap-2 mb-1">
                <Home size={16} className="text-gray-600" />
                <span className="font-semibold">
                    {count} {count === 1 ? "endereço" : "endereços"}
                </span>
            </div>

            <div className="flex flex-wrap gap-2">
                {types.residencial > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 border border-blue-500">
                        <House size={14} className="text-blue-600" />
                        {types.residencial} Residencial
                    </span>
                )}
                {types.comercial > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 border border-green-500">
                        <Building size={14} className="text-green-600" />
                        {types.comercial} Comercial
                    </span>
                )}
                {types.industrial > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-violet-100 text-violet-700 border border-violet-500">
                        <Factory size={14} className="text-violet-600" />
                        {types.industrial} Industrial
                    </span>
                )}
                {types.rural > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700 border border-amber-500">
                        <Sprout size={14} className="text-amber-600" />
                        {types.rural} Rural
                    </span>
                )}
            </div>
        </div>
    );
}

function TotalConsumptionKwh({ total_consumption }) {
    return (
        <div className="inline-flex items-center gap-2 text-gray-700">
            <Zap size={16} className="text-yellow-500" />
            <span className="font-semibold">{total_consumption} kWh</span>
        </div>
    );
}

function TotalBill({ total_bill }) {
    return (
        <div className="inline-flex items-center gap-2 text-gray-700">
            <Banknote size={16} className="text-green-500" />
            <span className="font-semibold">R$ {total_bill}</span>
        </div>
    );
}

function Actions({ actions }) {
    return (
        <button
            onClick={() => router.visit(actions[0].route)}
            title="Ver detalhes"
            className="flex items-center font-semibold gap-1 text-gray-700 hover:text-gray-900 transition"
        >
            <Eye size={16} />
            <span>Ver Detalhes</span>
        </button>
    );
}


export default function CustomerDataTableRow({ customer, headers }) {
    return (
        <tr className="border-t border-gray-400">
            {headers.map((header) => (
                <td key={header.key} className="p-4">
                    {header.key === "customer_info" ? (
                        <CustomerInfo customer_info={customer.customer_info} />
                    ) : header.key === "address_info" ? (
                        <AddressInfo address_info={customer.address_info} />
                    ) : header.key === "total_consumption" ? (
                        <TotalConsumptionKwh
                            total_consumption={customer.total_consumption}
                        />
                    ) : header.key === "total_bill" ? (
                        <TotalBill total_bill={customer.total_bill} />
                    ) : header.key === "actions" ? (
                        <Actions actions={customer.actions} />
                    ) : (
                        customer[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
