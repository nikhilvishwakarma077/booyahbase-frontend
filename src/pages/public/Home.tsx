import AboutSection from "../../components/home/AboutSection"
import CTASection from "../../components/home/CTASection"
import FeaturesSection from "../../components/home/FeaturesSection"
import Hero from "../../components/home/Hero"
import HowItWorksSection from "../../components/home/HowItWorksSection"
import ScrimsSection from "../../components/home/ScrimsSection"

const Home = () => {
    return (
        <>
            <Hero />
            <AboutSection />
            <FeaturesSection />
            <ScrimsSection />
            <HowItWorksSection />
            <CTASection />
        </>

    )
}

export default Home