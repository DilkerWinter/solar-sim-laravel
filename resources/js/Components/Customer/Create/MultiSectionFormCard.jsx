import { Trash2 } from "lucide-react";
import React from "react";
import AddOptionalFormButton from "./AddOptionalFormButton";

export default function OptionalMultiSectionFormCard({
  sections = [],
  onRemoveSection = null,
  onAdd = null,
  onRemoveCard = null,
  addText = "Adicionar Seção",
  removeText = "Remover",
  removeCardText = "Remover Card",
}) {
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 relative">
      {sections.map((section, idx) => (
        <div key={idx} className="space-y-4 p-4 relative">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit ${section.headerBgColor} ${section.headerTextColor}`}
            >
              {section.IconComponent && <section.IconComponent className="w-5 h-5" />}
              <h2 className="font-semibold text-lg">{section.headerText}</h2>
            </div>

            <div className="flex items-center gap-2">

              {onRemoveSection && section.isRemovable && (
                <button
                  type="button"
                  onClick={() => onRemoveSection(idx)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
                  title={`Remover seção ${section.headerText}`}
                >
                  <Trash2 className="w-4 h-4" />
                  {removeText}
                </button>
              )}

              {idx === 0 && onRemoveCard && (
                <button
                  type="button"
                  onClick={onRemoveCard}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
                  title={removeCardText}
                >
                  <Trash2 className="w-4 h-4" />
                  {removeCardText}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {section.children}
          </div>

          {idx === sections.length - 1 && onAdd && (
            <div className="flex justify-center pt-4">
              <AddOptionalFormButton text={addText} onClick={onAdd} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
