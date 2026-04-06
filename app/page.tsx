import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CatchesSection from "@/components/sections/CatchesSection";
import DemoSection from "@/components/sections/DemoSection";
import CommandsSection from "@/components/sections/CommandsSection";
import OrbitSection from "@/components/sections/OrbitSection";
import MCPSection from "@/components/sections/MCPSection";
import InstallSection from "@/components/sections/InstallSection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        본문으로 건너뛰기
      </a>
      <NavBar />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CatchesSection />
        <DemoSection />
        <CommandsSection />
        <OrbitSection />
        <MCPSection />
        <OrbitSection />
        <InstallSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
