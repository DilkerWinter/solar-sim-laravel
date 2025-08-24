import { useEffect, useState } from "react";
import { Check, X, AlertTriangle, Info } from "lucide-react";

export default function SnackBar({ type = 'default', message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const duration = 4000;

  useEffect(() => {
    setIsVisible(true);
    
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300);

    const removeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  const colors = {
    success: 'bg-gradient-to-r from-green-500 to-green-600 border-green-400',
    error: 'bg-gradient-to-r from-red-500 to-red-600 border-red-400',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-400',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400',
    default: 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600',
  };

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    default: <Info className="w-5 h-5" />,
  };

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      className={`
        fixed top-24 right-4 z-50 min-w-80 max-w-md
        flex items-center gap-3 px-4 py-3
        text-white rounded-lg shadow-xl border-l-4
        cursor-pointer backdrop-blur-sm
        transition-all duration-300 ease-out
        ${colors[type]}
        ${isVisible && !isExiting ? 
          'transform translate-x-0 opacity-100 scale-100' : 
          'transform translate-x-full opacity-0 scale-95'
        }
        hover:shadow-xl hover:scale-105
      `}
      onClick={handleClick}
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      
      <div className="flex-1 text-sm font-medium leading-relaxed">
        {message}
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className="flex-shrink-0 p-1 rounded-full hover:bg-black/20 transition-colors duration-200"
        aria-label="Fechar notificação"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-white transition-all ease-linear ${
            isVisible && !isExiting ? 'w-0' : 'w-full'
          }`}
          style={{ 
            transitionDuration: isVisible && !isExiting ? `${duration}ms` : '0ms'
          }}
        />
      </div>
    </div>
  );
}