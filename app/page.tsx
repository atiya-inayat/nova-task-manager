import { ComparisonSection } from "./component/comparison-section";
import CTA from "./component/CTA";
import Features from "./component/Features";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import HowItWorksSection from "./component/HowItWorksSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ComparisonSection />
      <HowItWorksSection />
      <CTA />
      <Footer />
    </main>
  );
}
