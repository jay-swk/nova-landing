import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import EvaluationSection from "@/components/sections/EvaluationSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CatchesSection from "@/components/sections/CatchesSection";
import DemoSection from "@/components/sections/DemoSection";
import CommandsSection from "@/components/sections/CommandsSection";
import OrbitSection from "@/components/sections/OrbitSection";
import MCPSection from "@/components/sections/MCPSection";
import InstallSection from "@/components/sections/InstallSection";
import FAQSection from "@/components/sections/FAQSection";
import { getNovaMeta } from "./lib/nova-meta";

export default async function Home() {
  const meta = await getNovaMeta();

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        본문으로 건너뛰기
      </a>
      <NavBar version={meta.version} />
      <main id="main-content">
        <HeroSection stats={meta.stats} />
        <ProblemSection />
        <EvaluationSection stats={meta.stats} />
        <HowItWorksSection />
        <FeaturesSection />
        <CatchesSection />
        <DemoSection />
        <CommandsSection commands={meta.commands} />
        <OrbitSection />
        <MCPSection />
        <InstallSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
