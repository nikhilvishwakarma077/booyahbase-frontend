import CTASection from "../../components/home/CTASection"
import FeaturesSection from "../../components/home/FeaturesSection"
import Hero from "../../components/home/Hero"
import HowItWorksSection from "../../components/home/HowItWorksSection"
import OrganizerMarquee from "../../components/home/OrganizersMarquee"
import ScrimsSection from "../../components/home/ScrimsSection"

const Home = () => {
    return (
        <>
            <Hero />
            <OrganizerMarquee />
            <FeaturesSection />
            <ScrimsSection />
            <HowItWorksSection />
            <CTASection />
        </>

    )
}

export default Home