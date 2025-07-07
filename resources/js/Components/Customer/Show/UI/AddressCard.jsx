import { ChevronDown, ChevronUp, Home } from "lucide-react";
import EnergyInfoCard from "./EnergyInfoCard";
import { useState } from "react";

export default function AddressCard({ addresses = [] }) {
    if (!addresses.length) {
        return (
            <div className="text-gray-500 italic mt-4">
                Nenhum endereço cadastrado.
            </div>
        );
    }

    const [openIds, setOpenIds] = useState(() =>
        addresses.reduce((acc, address) => {
            acc[address.id] = false;
            return acc;
        }, {})
    );

    const toggleOpen = (id) => {
        setOpenIds((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="space-y-8 mt-10">
            {addresses.map((address, index) => {
                const isOpen = openIds[address.id] ?? true;

                const resumoEndereco = `${address.street}, ${address.number} - ${address.city}/${address.state}`;

                return (
                    <div
                        key={address.id}
                        className="bg-white shadow-2xl rounded-2xl p-8 space-y-4 mb-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit bg-green-100 text-green-700">
                                <Home className="w-5 h-5" />
                                <h2 className="font-semibold text-lg">
                                    { resumoEndereco }
                                </h2>
                            </div>

                            <button
                                onClick={() => toggleOpen(address.id)}
                                className="p-2 rounded-full hover:bg-green-200 transition"
                                aria-label={
                                    isOpen
                                        ? "Fechar endereço"
                                        : "Abrir endereço"
                                }
                            >
                                {isOpen ? (
                                    <ChevronUp className="w-5 h-5 text-green-700" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-green-700" />
                                )}
                            </button>
                        </div>



                        <div
                            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                                isOpen
                                    ? "max-h-[1000px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mt-4">
                                <div>
                                    <p className="text-sm text-gray-500">Rua</p>
                                    <p className="font-semibold">
                                        {address.street}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">CEP</p>
                                    <p className="font-semibold">
                                        {address.cep}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Número
                                    </p>
                                    <p className="font-semibold">
                                        {address.number}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Bairro
                                    </p>
                                    <p className="font-semibold">
                                        {address.neighborhood}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Cidade
                                    </p>
                                    <p className="font-semibold">
                                        {address.city}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Estado
                                    </p>
                                    <p className="font-semibold">
                                        {address.state}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Natureza do imóvel
                                    </p>
                                    <p className="font-semibold capitalize">
                                        {address.type}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tipo de Telhado
                                    </p>
                                    <p className="font-semibold">
                                        {address.roof_type}
                                    </p>
                                </div>
                            </div>

                            <EnergyInfoCard
                                energyInfo={address.address_energy_info}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
