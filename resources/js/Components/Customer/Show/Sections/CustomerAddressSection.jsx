import AddressCard from "../UI/AddressCard";
import { MapPin } from "lucide-react";

export default function CustomerAddressSection({ customer }) {
    const addresses = customer?.addresses || [];

    return (
        <section className="bg-white border border-gray-200 rounded-md p-6 mt-6">
            <div
                className="flex items-center justify-between mb-4"
            >
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-green-100 text-green-700">
                    <MapPin className="w-5 h-5" />
                    <h2 className="font-semibold text-lg select-none">
                        Endereços do Cliente
                    </h2>
                </div>
            </div>

            {addresses.length === 0 ? (
                <p className="text-gray-500 text-sm">Nenhum endereço cadastrado.</p>
            ) : (
                <div className="space-y-6">
                    {addresses.map((address) => (
                        <AddressCard key={address.id} address={address} />
                    ))}
                </div>
            )}
        </section>
    );
}
