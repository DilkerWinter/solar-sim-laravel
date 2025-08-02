import React, { useState } from "react";
import { Edit3, Save, Trash2 } from "lucide-react";
import ConfirmModal from "@/Components/ConfirmModal";

export default function CustomerShowHeaderSection({
  isEditing,
  onToggleEdit,
  onSave,
}) {
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  const handleEditClick = () => setConfirmEditOpen(true);
  const handleSaveClick = () => setConfirmSaveOpen(true);

  function handleCancelClick() {
    onToggleEdit();
  }

  const confirmEdit = () => {
    onToggleEdit(); 
    setConfirmEditOpen(false);
  };

  const confirmSave = () => {
    onSave(); 
    setConfirmSaveOpen(false);
  };

  return (
    <section className="p-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Detalhes do Cliente
          </h2>
          <p className="text-gray-600">
            Gerencie informações pessoais, endereços e dados de energia
          </p>
        </div>

        <div className="flex items-center gap-2">
          
          {isEditing && (
            <button
              onClick={handleCancelClick}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 shadow-sm bg-gray-300 text-black hover:text-white hover:bg-gray-500"
            >
              <span>Cancelar</span>
            </button>
          )}

          <button
            onClick={isEditing ? handleSaveClick : handleEditClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 shadow-sm  ${
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
      </div>

      <ConfirmModal
        isOpen={confirmEditOpen}
        title="Confirmar edição"
        message="Tem certeza que deseja entrar no modo edição?"
        onConfirm={confirmEdit}
        onClose={() => setConfirmEditOpen(false)}
        theme="info"
      />


      <ConfirmModal
        isOpen={confirmSaveOpen}
        title="Confirmar alterações"
        message="Deseja salvar as alterações feitas no cliente?"
        onConfirm={confirmSave}
        onClose={() => setConfirmSaveOpen(false)}
        theme="success"
      />
    </section>
  );
}
