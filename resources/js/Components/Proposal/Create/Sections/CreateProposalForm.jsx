import { CustomerSection } from "./CustomerSection";
import { KitSection } from "./KitSection";

export default function CreateProposalForm({
    formData,
    setFormData,
    customerOptions,
    kitOptions,
}) {
    return (
        <section>
            <CustomerSection
                formData={formData}
                setFormData={setFormData}
                customerOptions={customerOptions}
            />

            <KitSection
                formData={formData}
                setFormData={setFormData}
                kitOptions={kitOptions}
            />
        </section>
    );
}
