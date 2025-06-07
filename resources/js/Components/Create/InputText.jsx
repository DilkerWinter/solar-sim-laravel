export default function InputField({ label, name, type = 'text', textarea = false }) {
  return (
    <div className={textarea ? 'md:col-span-2' : ''}>
      <label className="block text-sm font-medium">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  );
}
