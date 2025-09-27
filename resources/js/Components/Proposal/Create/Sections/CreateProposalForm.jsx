import SelectField from "@/Components/UI/Inputs/SelectInput";
import { api } from "@/Utils/api";
import { useState } from "react";

export default function CreateProposalForm({
    formData,
    setFormData,
    customerOptions,
    kitOptions,
}) {
    const [selectedCustomer, setSelectedCustomer] = useState({});

    const handleSelectCustomer = async (customerId) => {
        if (!customerId) return;

        try {
            const response = await api.get(
                route("customers.show", customerId)
            );
            const customerData = response.data;
            setSelectedCustomer(customerData);
            console.log("Dados do cliente:", customerData);
        } catch (error) {
            console.error("Erro ao buscar cliente:", error);
        }
    };

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="Cliente"
                    name="customer_id"
                    value={selectedCustomer?.id}
                    onChange={handleSelectCustomer}
                    options={customerOptions?.map((customer) => ({
                        value: customer.id,
                        label: customer.label,
                    }))}
                    required
                />

                <SelectField
                    label="Kit Solar"
                    name="kit_id"
                    value={formData.kit_id}
                    onChange={(value) =>
                        setFormData({ ...formData, kit_id: value })
                    }
                    options={kitOptions?.map((kit) => ({
                        value: kit.id,
                        label: kit.label,
                    }))}
                    required
                />
            </div>
        </section>
    );
}
