import { useEffect } from "react";

export default function SnackBar({ type, message, onClose }) {
    const duration = 3000;

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    default: 'bg-gray-800',
  };

  return (
    <div className={`px-4 py-2 text-white rounded shadow-lg ${colors[type]}`}>
      {message}
    </div>
  );
}