export default function EditableField({ label, value, onChange, required = false }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border-gray-300 shadow-sm text-sm px-3 py-2"
      />
    </div>
  );
}
