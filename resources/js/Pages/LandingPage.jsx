import Header from "@/Components/LandingPage/Sections/Header";
import FirstSection from "@/Components/LandingPage/Sections/FirstSection";
import SecondSection from "@/Components/LandingPage/Sections/SecondSection";

/**
 * Landing Page of the app
 * @returns 
 */
export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-600 to-blue-500">
            <Header />
            <FirstSection/>
            <SecondSection/>
        </div>  
    );
}
