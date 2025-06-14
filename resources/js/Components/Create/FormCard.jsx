import { Trash2 } from "lucide-react";
import React from "react";

export default function FormCard({
  headerBgColor = "bg-blue-100",
  headerTextColor = "text-blue-700",
  IconComponent,
  headerText = "InputText",
  children,
  onRemove = null,
  removeText = "Remover",
}) {
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 relative">

      <div className="flex items-center justify-between">
        <div
          className={`flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit ${headerBgColor} ${headerTextColor}`}
        >
          {IconComponent && <IconComponent className="w-5 h-5" />}
          <h2 className="font-semibold text-lg">{headerText}</h2>
        </div>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            {removeText}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
