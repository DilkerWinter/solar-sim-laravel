import { useEffect, useRef, useState } from "react";
import SectionTitle from "../UI/SectionTitle";
import { router } from "@inertiajs/react";

export default function SecondSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                threshold: 0.75,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="second-section"
            ref={sectionRef}
            className="py-20 px-6 bg-gray-50"
            aria-label="Seção com visualização do dashboard do SolarSim"
        >
            <div className="max-w-5xl mx-auto text-center">
                <SectionTitle
                    className={`transition-all duration-700 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    Veja o Dashboard do SolarSim
                </SectionTitle>
                <p
                    className={`text-gray-600 text-lg mb-12 max-w-xl mx-auto transition-all duration-700 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    Uma visão clara e intuitiva da performance do seu sistema
                    solar.
                </p>
            </div>

            <div className="max-w-7xl mx-auto text-center">
                <div
                    className={`p-4 bg-gradient-to-b from-green-600/50 to-blue-500/50 rounded-3xl
                    shadow-2xl transition-all duration-700 ease-out
                    ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
                    style={{ willChange: "transform, opacity" }}
                >
                    <img
                        src="/images/customers-index.png"
                        alt="Visual do Dashboard do SolarSim"
                        className="w-full h-auto object-cover rounded-3xl"
                        loading="lazy"
                        draggable={false}
                    />
                </div>

                <button
                    className={`mt-10 px-8 py-3 font-semibold text-white rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg
                    hover:scale-105 hover:shadow-xl transition-transform duration-300
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    aria-label="Explorar mais sobre o SolarSim"
                    onClick={() => router.visit('/login')} 
                >
                    Explorar mais
                </button>
            </div>
        </section>
    );
}
