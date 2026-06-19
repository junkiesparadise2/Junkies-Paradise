import { Compass, Instagram, Mail, ShieldAlert, Phone } from "lucide-react";
import BrandLogo from "./BrandLogo";

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateToSection }: FooterProps) {
  return (
    <footer className="bg-brand-navy border-t border-slate-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col items-start cursor-pointer group" onClick={() => onNavigateToSection("home")}>
              <div className="bg-white p-1.5 rounded-xl inline-flex items-center justify-center shadow-lg mb-2 group-hover:scale-105 transition-transform duration-300 border border-slate-200">
                <BrandLogo size="md" variant="icon" className="w-[52px] h-[52px]" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-brand-gold transition duration-200">
                JUNKIES <span className="text-brand-gold group-hover:text-white">PARADISE</span>
              </span>
            </div>
            
            <p className="font-serif italic text-base text-slate-300">
              “Explore more. Worry less.”
            </p>
            <p className="font-sans text-xs text-slate-500 max-w-sm leading-relaxed">
              Premium custom travel advisor organizing breathtaking domestic and international escapes. Complete itinerary management, premium accommodation and VIP transport design.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-white uppercase tracking-widest text-xs">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigateToSection("home")} className="hover:text-brand-gold transition duration-200 cursor-pointer text-left">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("domestic")} className="hover:text-brand-gold transition duration-200 cursor-pointer text-left">
                  Domestic Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("international")} className="hover:text-brand-gold transition duration-200 cursor-pointer text-left">
                  International Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("quote")} className="hover:text-brand-gold transition duration-200 cursor-pointer text-left">
                  Interactive Quote Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("contact")} className="hover:text-brand-gold transition duration-200 cursor-pointer text-left">
                  Office Desk &amp; Help
                </button>
              </li>
            </ul>
          </div>

          {/* Location details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-semibold text-white uppercase tracking-widest text-xs">
              Registered Desk
            </h4>
            <div className="space-y-3 font-sans text-xs text-slate-500 leading-relaxed">
              <p className="text-slate-300">
                C 19, Unit -3, First Floor, Street Number 10, Chattarpur Enclave Phase 2, New Delhi, 110074
              </p>
              <div className="space-y-1.5">
                <a href="mailto:junkies.paradise2@gmail.com" className="inline-flex items-center space-x-1.5 hover:text-brand-gold transition duration-200">
                  <Mail className="w-3.5 h-3.5" />
                  <span>junkies.paradise2@gmail.com</span>
                </a>
                <br />
                <a href="tel:+918800407009" className="inline-flex items-center space-x-1.5 hover:text-brand-gold transition duration-200 mt-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 88004 07009</span>
                </a>
              </div>
              <div className="flex items-center space-x-3.5 pt-2">
                <a
                  href="https://www.instagram.com/junkies_paradise_?igsh=ZHJxcWZpem91ZWU2"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-gold hover:text-brand-navy border border-slate-700/60 flex items-center justify-center text-slate-300 transition duration-300"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Panel */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-4">
          <p>© 2023 Junkies Paradise. All rights reserved globally.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-brand-gold/60" />
              <span>Premium Escapes Guarantee</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
