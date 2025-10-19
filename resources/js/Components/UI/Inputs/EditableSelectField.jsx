export default function EditableSelectField({
  label,
  name,
  options = [],
  value,
  onChange,
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-300 shadow-sm text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
