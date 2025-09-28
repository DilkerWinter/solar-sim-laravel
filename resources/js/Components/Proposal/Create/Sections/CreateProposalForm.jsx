import { CustomerSection } from "./CustomerSection";
import { KitSection } from "./KitSection";
import { ProposalSection } from "./ProposalSection";

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

            <ProposalSection
                formData={formData}
                setFormData={setFormData}
            />
        </section>
    );
}
