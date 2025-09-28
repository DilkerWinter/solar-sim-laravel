import React from "react";

export default function LoadingSpinner() {
    return (
        <div
            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70"
            style={{ pointerEvents: "none" }}
        >
            <svg
                className="animate-spin h-12 w-12"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#grad2)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="150"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="25"
                    stroke="url(#grad2)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="100"
                    strokeDashoffset="50"
                    strokeLinecap="round"
                    className="animate-spin-reverse"
                />
            </svg>
        </div>
    );
}
