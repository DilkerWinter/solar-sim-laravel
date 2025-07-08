export default function EditableField({ label, defaultValue }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full rounded-md border-gray-300 shadow-sm text-sm px-3 py-2"
      />
    </div>
  );
}
