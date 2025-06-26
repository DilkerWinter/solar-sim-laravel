export default function CustomerInfoCard({ label, value, unit, icon: Icon, colorClass }) {
  return (
    <div
      className="
        bg-white shadow-sm rounded-2xl p-6 sm:p-8
        flex flex-wrap items-center justify-between
        w-full max-w-full sm:max-w-sm
        border border-gray-300
      "
    >
      <div>
        <p className="text-base text-gray-500 truncate">{label}</p>
        <div className="text-2xl sm:text-3xl font-extrabold flex items-baseline space-x-1 truncate">
          <span className={colorClass}>{value}</span>
          {unit && <span className="text-base text-gray-500">{unit}</span>}
        </div>
      </div>
      <Icon
        className={`h-10 w-10 ml-4 flex-shrink-0 ${colorClass}`}
        aria-hidden="true"
      />
    </div>
  );
}
