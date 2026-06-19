import { useState } from "react";
import { Package } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Packages from "./components/Packages";
import QuoteSection from "./components/QuoteSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    // Scroll directly to the interactive quote form section
    navigateToSection("quote");
  };

  const handleClearSelectedPackage = () => {
    setSelectedPackage(null);
  };

  const handlePlanTripClick = () => {
    navigateToSection("quote");
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 selection:bg-brand-gold selection:text-brand-navy">
      {/* Premium Header */}
      <Header onNavigateToSection={navigateToSection} />

      {/* Immersive Hero banner */}
      <Hero onPlanTripClick={handlePlanTripClick} />

      {/* Core Services tabbed showcases - Domestic focus first */}
      <Packages onSelectPackage={handleSelectPackage} />

      {/* Interactive quote inquiry & Customized day-by-day AI generation */}
      <QuoteSection
        selectedPackage={selectedPackage}
        onClearSelectedPackage={handleClearSelectedPackage}
      />

      {/* Frequently FAQs and Direct contact points */}
      <ContactSection />

      {/* Footer address card and Social references */}
      <Footer onNavigateToSection={navigateToSection} />
    </div>
  );
}
