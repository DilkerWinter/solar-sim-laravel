import BackButton from "@/Components/Create/BackButton";
import FormCard from "@/Components/Create/FormCard";
import InputField from "@/Components/Create/InputText";
import { ArrowLeft, House, User, Zap } from "lucide-react";
import React from "react";

export default function Create() {
    return (
        <div className="w-full h-full px-6 relative">

            {/* Back Button and Title */}
            <div className="relative w-full max-w-5xl mx-auto mt-4">
                <BackButton />
              <div className="mb-12 mt-4">
                <h1 className="text-3xl font-bold text-center ">Cadastro de Cliente</h1>
              </div>
            </div>



            <form className="w-full max-w-5xl mx-auto space-y-6">
                {/* Card: Personal Info */}
                <FormCard
                    headerBgColor="bg-blue-100"
                    headerTextColor="text-blue-700"
                    IconComponent={User}
                    headerText="Informações do Usuário"
                >
                    <InputField label="Nome" name="name" required={true} regex="^[A-Za-zÀ-ÿ\s'-]{3,}$" />
                    <InputField label="Email" name="email" type="email" required={true} regex="^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$" hint="exemplo@dominio.com"/>
                    <InputField label="Telefone" name="phone" required={true} regex="^(\+55)?[\s]?\(?(\d{2})?\)?[\s-]?(9?\d{4}[\s-]?\d{4})$" hint="(67) 99999-9999" />
                </FormCard>

                {/* Card: Adress */}
                <FormCard
                    headerBgColor="bg-green-100"
                    headerTextColor="text-green-700"
                    IconComponent={House}
                    headerText="Endereço"
                >
                    <InputField label="Rua" name="street" />
                    <InputField label="CEP" name="postal_code" />
                    <InputField label="Número" name="number" />
                    <InputField label="Bairro" name="neighborhood" />
                    <InputField label="Cidade" name="city" />
                    <InputField label="Estado" name="state"/>
                </FormCard>

                {/* Card: Eletric Info */}
                <FormCard
                    headerBgColor="bg-yellow-100"
                    headerTextColor="text-yellow-700"
                    IconComponent={Zap}
                    headerText="Informações de Energia Elétrica"
                >
                    <InputField
                        label="Consumo Médio Mensal (kWh)" 
                        name="average_monthly_consumption_kwh"
                    />
                    <InputField
                        label="Consumo Médio Anual (kWh)"
                        name="average_annual_consumption_kwh"
                    />
                    <InputField
                        label="Conta de Energia Média (R$)"
                        name="average_energy_bill"
                    />
                    <InputField
                        label="Concessionária de Energia"
                        name="energy_provider"
                    />
                    <InputField
                        label="Tipo de Instalação"
                        name="installation_type"
                    />
                    <InputField label="Tipo de Telhado" name="roof_type" />
                    <InputField label="Observações" name="notes" textarea />
                </FormCard>

                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-2xl hover:bg-blue-700 text-xl "
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}
