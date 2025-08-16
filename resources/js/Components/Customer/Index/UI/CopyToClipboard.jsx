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
        <div
            onClick={handleCopy}
            className="relative cursor-pointer flex items-center transition  rounded-full border border-transparent hover:border-gray-600 hover:bg-gray-300 p-1"
        >
            <Copy size={16} className="text-gray-600 " title={title} />
            {copied && (
                <span
                    className={`absolute left-6 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow z-10 whitespace-nowrap transition-opacity duration-500 ${
                        visible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    Copiado!
                </span>
            )}
        </div>
    );
}
