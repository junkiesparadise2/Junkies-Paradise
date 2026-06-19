import { Compass, ChevronDown, Award, Globe, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onPlanTripClick: () => void;
}

export default function Hero({ onPlanTripClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1800&q=80"
          alt="Breathtaking Luxury Paradise"
          className="w-full h-full object-cover scale-105 animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-900 to-transparent z-10" />
      </div>

      {/* Decorative Floating Sparkles */}
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-brand-gold rounded-full opacity-60 blur-xs animate-ping hidden md:block" />
      <div className="absolute bottom-1/3 left-10 w-2 h-2 bg-brand-gold rounded-full opacity-40 blur-xs animate-pulse hidden md:block" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 w-full text-left">
        <div className="max-w-3xl">
          {/* Animated Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-brand-navy/80 backdrop-blur-sm border border-brand-gold/30 px-3.5 py-1.5 rounded-full mb-6 shadow-lg shadow-black/30"
          >
            <Compass className="w-4 h-4 text-brand-gold animate-pulse" />
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-brand-gold">
              Crafting Extraordinary Journeys
            </span>
          </motion.div>

          {/* Slogan & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-6 space-y-4"
          >
            <p className="font-serif italic text-2xl sm:text-3xl text-brand-gold tracking-wide">
              Explore more. Worry less.
            </p>
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white leading-[0.9] uppercase">
              Escape<br />
              The Ordinary
            </h1>
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase pt-2">
              With <span className="text-brand-gold underline decoration-4 decoration-brand-gold/40">Junkies Paradise</span>
            </h2>
          </motion.div>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-10"
          >
            Seamless, custom-curated domestic and international travel itineraries tailored to your unique desires. We handle the blueprints, you experience the paradise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5"
          >
            <button
              onClick={onPlanTripClick}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-sans font-bold text-base px-8 py-4.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/25 transform hover:-translate-y-1 text-center cursor-pointer shadow-lg shadow-brand-gold/15 flex items-center justify-center space-x-3.5 group"
            >
              <span>Plan Your Trip Now</span>
              <Compass className="w-5 h-5 text-brand-navy group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <a
              href="#domestic"
              className="bg-brand-navy-light/80 hover:bg-brand-navy-light text-slate-200 hover:text-white font-sans font-semibold text-base px-8 py-4.5 rounded-xl border border-slate-700/60 transition-all duration-300 text-center cursor-pointer flex items-center justify-center"
            >
              Explore Packages
            </a>
          </motion.div>

          {/* Small Trust Pillars Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-4 border-t border-slate-700/40 pt-8 max-w-2xl"
          >
            <div className="flex items-center space-x-2.5">
              <Award className="w-5 h-5 text-brand-gold shrink-0" />
              <span className="text-xs font-semibold uppercase text-slate-300 tracking-wide">
                Bespoke Planning
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Globe className="w-5 h-5 text-brand-gold shrink-0" />
              <span className="text-xs font-semibold uppercase text-slate-300 tracking-wide">
                Global Escapes
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
              <span className="text-xs font-semibold uppercase text-slate-300 tracking-wide">
                Seamless Support
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-xs font-mono tracking-widest text-slate-400 mb-2 uppercase">
          Scroll Down
        </span>
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center pt-1.5 shadow-md">
          <div className="w-1 h-2 bg-brand-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
