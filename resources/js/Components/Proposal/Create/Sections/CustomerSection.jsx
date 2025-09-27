import { useToast } from "@/Contexts/ToastContext";
import SelectField from "@/Components/UI/Inputs/SelectInput";
import { api } from "@/Utils/api";
import { useState, useRef, useEffect } from "react";
import { SelectedCustomerSection } from "./SelectedCustomerSection";
import { ChevronDown, ChevronUp } from "lucide-react";

export function CustomerSection({ formData, setFormData, customerOptions }) {
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [selectedAddress, setSelectedAddress] = useState({});
    const [isOpen, setIsOpen] = useState(true);
    const [height, setHeight] = useState("auto");
    const contentRef = useRef(null);
    const { error } = useToast();

    const validAddresses =
        selectedCustomer?.addresses?.filter(
            (address) => address.energy_info !== null
        ) || [];

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                const scrollHeight = contentRef.current.scrollHeight;
                setHeight(scrollHeight + "px");
            } else {
                setHeight("0px");
            }
        }
    }, [isOpen, selectedCustomer, selectedAddress]);

    const handleSelectCustomer = async (customerId) => {
        if (!customerId) return;

        try {
            const response = await api.get(route("customers.show", customerId));
            const customerData = response.data;
            setSelectedCustomer(customerData);
            setSelectedAddress({});
            setFormData({ ...formData, customer_id: customerData.id });
        } catch (e) {
            error("Erro ao buscar cliente");
        }
    };

    const handleSelectAddress = (addressId) => {
        const address = validAddresses.find(
            (address) => address.id === parseInt(addressId)
        );
        setSelectedAddress(address);
        setFormData({ ...formData, address_id: address?.id });
    };

    return (
        <div className="border rounded-md overflow-hidden shadow-sm">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                aria-expanded={isOpen}
                aria-controls="customer-content"
            >
                <h2 className="text-lg font-semibold text-left text-gray-800">
                    Cliente
                </h2>
                <div className="transform transition-transform duration-300 ease-in-out">
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                </div>
            </button>

            <div
                id="customer-content"
                ref={contentRef}
                className="transition-all duration-250 ease-in-out overflow-hidden"
                style={{ height: height }}
            >
                <div className="px-4 py-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField
                            label="Selecione o Cliente"
                            name="customer_id"
                            value={selectedCustomer?.id || ""}
                            onChange={handleSelectCustomer}
                            options={customerOptions?.map((customer) => ({
                                value: customer.id,
                                label: customer.label,
                            }))}
                            required
                        />

                        <SelectField
                            label="Selecione o Endereço"
                            name="address_id"
                            value={selectedAddress?.id || ""}
                            onChange={handleSelectAddress}
                            options={validAddresses.map((address) => ({
                                value: address.id,
                                label: `${address.street}, ${address.number} - ${address.city}/${address.state}`,
                            }))}
                            required
                            disabled={validAddresses.length === 0}
                        />
                    </div>

                    {selectedCustomer?.id && selectedAddress?.id && (
                        <div className="mt-6 animate-fade-in">
                            <SelectedCustomerSection
                                selectedCustomer={selectedCustomer}
                                selectedAddress={selectedAddress}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
