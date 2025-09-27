import CustomBreadcrumb from "@/Components/AppLayout/CustomBreadcrumb";
import CreateProposalForm from "@/Components/Proposal/Create/Sections/CreateProposalForm";
import CreteProposalHeader from "@/Components/Proposal/Create/Sections/CreateProposalHeader";
import SubmitButton from "@/Components/UI/Inputs/SubmitButton";
import AppLayout from "@/Layouts/AppLayout";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";

export default function Create({ kitOptions, customerOptions }) {
    const [formData, setFormData] = useState({});
    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("proposals.store"), formData);
    }

    return (
        <div>
            <CreteProposalHeader/>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-5xl mx-auto space-y-8 bg-white rounded-2xl p-6"
            >
                <CreateProposalForm
                    kitOptions={kitOptions?.data}
                    customerOptions={customerOptions?.data}
                    formData={formData}
                    setFormData={setFormData}
                />

                <div className="flex justify-end">
                    <SubmitButton
                        text={"Cadastrar"}
                        onSubmit={handleSubmit}
                    ></SubmitButton>
                </div>
            </form>
        </div>
    );
}

Create.layout = (page) => (
    <AppLayout
        breadcrumb={
            <CustomBreadcrumb
                items={[
                    { name: "Início", href: "/dashboard" },
                    { name: "Propostas", href: "/proposals" },
                    { name: "Cadastro" },
                ]}
            />
        }
    >
        {page}
    </AppLayout>
);
