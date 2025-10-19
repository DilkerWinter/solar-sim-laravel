import React from 'react';

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
  theme = 'danger' // 'danger' | 'info' | 'success'
}) {
  if (!isOpen) return null;

  const themes = {
    danger: {
      confirmColor: 'bg-red-600 hover:bg-red-700 text-white',
    },
    info: {
      confirmColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    success: {
      confirmColor: 'bg-green-600 hover:bg-green-700 text-white',
    },
  };

  const cancelColor = 'bg-gray-300 hover:bg-gray-400 text-black';
  const confirmColor = themes[theme]?.confirmColor || themes.danger.confirmColor;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-2xl ${cancelColor}`}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-2xl ${confirmColor}`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
