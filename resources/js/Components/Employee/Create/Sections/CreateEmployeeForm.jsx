import InputField from "@/Components/UI/Inputs/InputField";
import SelectField from "@/Components/UI/Inputs/SelectInput";

export default function CreateEmployeeForm({ formData, setFormData }) {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Nome"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
                <InputField
                    label="Email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                />
                <SelectField
                    label="Cargo"
                    name="isAdmin"
                    options={[
                        { value: "false", label: "Funcionário" },
                        { value: "true", label: "Administrador" },
                    ]}
                    value={formData.isAdmin ? "true" : "false"}
                    onChange={(value) =>
                        setFormData({ ...formData, isAdmin: value === "true" })
                    }
                />
            </div>
        </section>
    );
}
