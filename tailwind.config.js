import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                "fade-slide-in": {
                    "0%": { opacity: "0", transform: "translateY(1rem)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "grow-underline": {
                    "0%": { transform: "scaleX(0)" },
                    "100%": { transform: "scaleX(1)" },
                },
            },
            animation: {
                "fade-slide-in": "fade-slide-in 0.8s ease-out forwards",
                "grow-underline": "grow-underline 0.8s ease-out 0.3s forwards", 
            },
        },
    },

    plugins: [forms],
};
