import { Banknote, Eye, House, Mail, Phone, Zap } from "lucide-react";
import CopyToClipboard from "./CopyToClipboard";
import { router } from "@inertiajs/react";

function CustomerInfo({ customer_info = [] }) {
    const [name, email, phone] = customer_info;

    return (
        <div className="flex flex-col">
            <span className="text-lg font-semibold">
                {name || "Nome não disponível"}
            </span>

            <span className="text-gray-600 flex items-center gap-2">
                <Mail size={14} className="text-gray-600" />
                {email || "Email não disponível"}
                {email && <CopyToClipboard text={email} title="Copiar Email" />}
            </span>

            <span className="text-gray-600 flex items-center gap-2">
                <Phone size={14} className="text-gray-600" />
                {phone || "Telefone não disponível"}
                {phone && (
                    <CopyToClipboard text={phone} title="Copiar Telefone" />
                )}
            </span>
        </div>
    );
}

function AddressCount({ addresses_count }) {
    return (
        <div className="inline-flex items-center gap-2 ">
            <House size={16} className="text-blue-500" />
            <span className="font-semibold">
                {addresses_count}{" "}
                {addresses_count === 1 ? "endereço" : "endereços"}
            </span>
        </div>
    );
}

function TotalConsumptionKwh({ total_consumption }) {
    return (
        <div className="inline-flex items-center gap-2  text-gray-600">
            <Zap size={16} className="text-yellow-500" />
            <span className="font-semibold">{total_consumption} kWh</span>
        </div>
    );
}

function TotalBill({ total_bill }) {
    return (
        <div className="inline-flex items-center gap-2  text-gray-600">
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
            className="flex items-center font-semibold gap-1  hover:text-gray-500 transition"
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
                        <CustomerInfo
                            customer_info={customer.customer_info}
                        />
                    ) : header.key === "addresses_count" ? (
                        <AddressCount
                            addresses_count={customer.addresses_count}
                        />
                    ) : header.key === "total_consumption" ? (
                        <TotalConsumptionKwh
                            total_consumption={customer.total_consumption}
                        />
                    ) : header.key === "total_bill" ? (
                        <TotalBill
                            total_bill={customer.total_bill}
                        />
                    ) : header.key === "actions" ? (
                        <Actions 
                            actions={customer.actions}
                        />
                    ) : (
                        customer[header.key]
                    )}
                </td>
            ))}
        </tr>
    );
}
