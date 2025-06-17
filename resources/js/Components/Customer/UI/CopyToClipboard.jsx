import { Copy } from "lucide-react";
import { useState, useEffect } from "react";

export default function CopyToClipboard({ text, title = "Copiar" }) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setVisible(true);
    setTimeout(() => setVisible(false), 500); 
    setTimeout(() => setCopied(false), 1000);  
  };

  return (
    <div className="relative flex items-center">
      <Copy
        size={14}
        onClick={handleCopy}
        className="text-gray-600 hover:text-black cursor-pointer transition"
        title={title}
      />
      {copied && (
        <span
          className={`absolute left-6 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow z-10 whitespace-nowrap transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Copiado!
        </span>
      )}
    </div>
  );
}
