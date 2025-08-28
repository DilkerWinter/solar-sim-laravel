import { useToast } from "@/Contexts/ToastContext";
import { useEffect, useState } from "react";

export default function InfoResumeCard({ label, value, url , unit, icon: Icon, colorClass }) {
  const [displayValue, setDisplayValue] = useState (value);
  const { error } = useToast();

  useEffect(() => {
    if(url) {
      axios.get(url)
        .then(response => {
          const total = response?.data ?? value;
          setDisplayValue(total);
        })
        .catch(e => {
          error("Erro ao buscar");
          setDisplayValue(value);
        });
    }
  }, [url, value]);

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
          <span className={colorClass}>{displayValue}</span>
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
