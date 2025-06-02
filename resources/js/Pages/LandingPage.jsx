import Header from "@/Components/LandingPage/Sections/LandingPageHeader";
import FirstSection from "@/Components/LandingPage/Sections/FirstSection";
import SecondSection from "@/Components/LandingPage/Sections/SecondSection";
import ThirdSection from "@/Components/LandingPage/Sections/ThirdSection";
import FourthSection from "@/Components/LandingPage/Sections/FourthSection";
import FithSection from "@/Components/LandingPage/Sections/FifthSection";
import Footer from "@/Components/LandingPage/Sections/Footer";

/**
 * Landing Page of the app
 * @returns 
 */
export default function LandingPage() {
    return (
        <div className="min-h-screen ">
            <Header />
            <FirstSection/>
            <SecondSection/>
            <ThirdSection/>
            <FourthSection/>
            <FithSection/>
            <Footer/>
        </div>  
    );
}
