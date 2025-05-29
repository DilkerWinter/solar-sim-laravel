import React from "react";
import Header from "@/Components/Login/Sections/LoginHeader";
import Footer from "@/Components/LandingPage/Sections/Footer";
import { Sun } from "lucide-react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            <Header />

            <main className="flex flex-col items-center justify-center flex-grow px-4 py-6 sm:py-12 sm:px-0">
                <div className="w-full max-w-md bg-white border-2 border-green-200 rounded-2xl shadow-xl p-6 sm:p-8">
                    <div className="mb-6 flex justify-center">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                            <Sun className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
