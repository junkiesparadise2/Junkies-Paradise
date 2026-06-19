import { useState, useEffect } from "react";
import { Compass, Menu, X, Instagram, PhoneCall } from "lucide-react";
import BrandLogo from "./BrandLogo";

interface HeaderProps {
  onNavigateToSection: (sectionId: string) => void;
}

export default function Header({ onNavigateToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Domestic Packages", id: "domestic" },
    { label: "International Packages", id: "international" },
    { label: "Get a Quote", id: "quote" },
    { label: "Contact Us", id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-navy/95 backdrop-blur-md border-b border-brand-navy-light shadow-lg py-3"
          : "bg-gradient-to-b from-brand-navy/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="bg-white p-1 rounded-xl shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 hover:shadow-lg border border-slate-200">
              <BrandLogo size="sm" variant="icon" className="w-[38px] h-[38px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-gold transition-colors duration-300">
                JUNKIES <span className="text-brand-gold group-hover:text-white">PARADISE</span>
              </span>
              <span className="font-serif italic text-[11px] text-slate-300 tracking-wider">
                Explore more. Worry less.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-sans text-sm font-medium text-slate-300 hover:text-brand-gold tracking-wide transition-colors duration-200 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Quick Contact CTA & Instagram */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://www.instagram.com/junkies_paradise_?igsh=ZHJxcWZpem91ZWU2"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="p-2 text-slate-300 hover:text-brand-gold transition-colors duration-200"
              aria-label="Instagram Link"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <button
              onClick={() => handleNavClick("quote")}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-sans font-bold text-xs uppercase px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-md shadow-brand-gold/10 hover:shadow-brand-gold/25 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-brand-gold transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-navy/95 border-b border-brand-navy-light px-4 pt-2 pb-6 space-y-3 absolute top-full left-0 w-full animate-fade-in backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2 font-sans text-base font-medium text-slate-300 hover:text-brand-gold border-b border-brand-navy-light/50 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="flex justify-between items-center pt-4">
            <a
              href="https://www.instagram.com/junkies_paradise_?igsh=ZHJxcWZpem91ZWU2"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center space-x-2 text-slate-300 hover:text-brand-gold transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">Follow on Instagram</span>
            </a>
            <button
              onClick={() => handleNavClick("quote")}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-sans font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center space-x-2 shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get a Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
