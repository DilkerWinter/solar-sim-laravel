import Header from "@/Components/LandingPage/UI/Header";
import FirstSection from "@/Components/LandingPage/Sections/FirstSection";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-600 to-blue-500">
            <Header />
            <FirstSection/>


            <section className="py-8 px-4 bg-transparent">
                <div className="max-w-4xl mx-auto">
                    <img
                        src="https://placehold.co/800x300/000000/FFFFFF?text=SolarSim+Dashboard&font=roboto"
                        alt="SolarSim Dashboard Preview"
                        className="w-full rounded-lg shadow-lg"
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                </div>
            </section>
        </div>
    );
}
