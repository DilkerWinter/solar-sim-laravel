import React from "react";
import { Edit3, Save } from "lucide-react";

export default function CustomerShowHeaderSection({ isEditing, onToggleEdit }) {
    return (
        <section className="p-2">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Detalhes do Cliente
                    </h2>
                    <p className="text-gray-600">
                        Gerencie informações pessoais, endereços e dados de
                        energia
                    </p>
                </div>

                <button
                    onClick={onToggleEdit}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm  ${
                        isEditing
                            ? "bg-blue-600 text-white hover:bg-blue-700 "
                            : "border border-blue-500 text-blue-500 hover:bg-blue-50 "
                    }`}
                >
                    {isEditing ? (
                        <>
                            <Save className="w-4 h-4" />
                            <span>Salvar</span>
                        </>
                    ) : (
                        <>
                            <Edit3 className="w-4 h-4" />
                            <span>Editar</span>
                        </>
                    )}
                </button>
            </div>
        </section>
    );
}
