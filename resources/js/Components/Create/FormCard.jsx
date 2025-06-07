import React from "react";

export default function FormCard({
  headerBgColor = "bg-blue-100",
  headerTextColor = "text-blue-700",
  IconComponent,
  headerText = "InputText",
  children,
}) {
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8">

      {/* Title */}
      <div
        className={`flex items-center space-x-3 px-4 py-2 rounded-full shadow w-fit ${headerBgColor} ${headerTextColor}`}
      >
        {IconComponent && <IconComponent className="w-5 h-5" />}
        <h2 className="font-semibold text-lg">{headerText}</h2>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
