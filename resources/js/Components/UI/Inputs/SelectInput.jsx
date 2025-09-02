export default function SelectField({
  label,
  name,
  options,
  required = false,
  optional = false,
  value,
  onChange,
  placeholder = "Selecione uma opção",
  disabled
}) {
  const hasValue = value && value !== "";

  const commonProps = {
    id: name,
    name,
    value: value || "",
    onChange: (e) => onChange(e.target.value),
    className:
      "mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-200",
    required,
    disabled,
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
        {!required && optional && (
          <span className="text-gray-400 ml-1 text-xs">(Opcional)</span>
        )}
      </label>
      <select {...commonProps}>
        {!hasValue && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}