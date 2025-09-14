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
                    name="role"
                    placeholder="Selecione o cargo do usuário"
                    options={[
                        { value: "user", label: "Funcionário" },
                        { value: "admin", label: "Administrador" },
                    ]}
                    value={formData.role}
                    onChange={(value) =>
                        setFormData({ ...formData, role: value })
                    }
                />
            </div>
        </section>
    );
}
