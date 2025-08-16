import { useState } from "react";
import { Menu, Route, Sun, X } from "lucide-react";
import { router } from "@inertiajs/react";

export default function LoginHeader() {
    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 py-2 shadow-xl">
            <div className="relative container mx-auto px-4 py-7 flex items-center justify-center">
                <div className="absolute left-4 flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                        <Sun className="h-6 w-6 text-white" />{" "}
                    </div>
                    <a
                        href="#"
                        onClick={() => router.visit('/')}
                        className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                    >
                        SolarSim
                    </a>
                </div>
            </div>
        </header>
    );
}
