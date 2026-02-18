import Footer from "../../layouts/footer";
import Navbar from "../../layouts/navbar";
import CollegeCloud from "@/components/page-ui/CollegeCloud";
import Features from "@/components/page-ui/features";
import Hero from "@/components/page-ui/hero";
import CollaborationHub from "@/components/page-ui/CollaborationHub"
import CollabFeatureGrid from "@/components/page-ui/CollabGrid";
import SupportSection from "@/components/page-ui/SupportSection"
import CTASection from "@/components/page-ui/CTASection"
import CollegeEvents from "@/components/page-ui/CollegeEvents"
import Leaderboard from "@/components/page-ui/Leaderboard"
import Testimonials from "@/components/page-ui/Testimonials"

export default function HomePage() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <Hero />
            <CollegeCloud />
            <Features />
            <CollegeEvents />
            <Leaderboard /> 
            <Testimonials />
            <CollaborationHub />
            <CollabFeatureGrid />
            <SupportSection />
            <CTASection />
            <Footer />
        </main>
    )
}