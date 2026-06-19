import { useState } from "react";
import { Package, TRAVEL_PACKAGES } from "../types";
import { Clock, Star, MapPin, Sparkles, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PackagesProps {
  onSelectPackage: (pkg: Package) => void;
}

export default function Packages({ onSelectPackage }: PackagesProps) {
  const [activeCategory, setActiveCategory] = useState<'Domestic' | 'International'>('Domestic');

  const filteredPackages = TRAVEL_PACKAGES.filter(p => p.type === activeCategory);

  return (
    <section id={activeCategory === 'Domestic' ? 'domestic' : 'international'} className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 bg-brand-gold/10 px-3.5 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-brand-gold">
              Inspiration Feed
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Spotlight Packages <span className="font-serif italic text-brand-gold">&amp; Escapes</span>
          </h2>
          <p className="font-sans text-slate-400 text-lg leading-relaxed">
            Choose from our pre-curated signature itineraries, handcrafted for ultimate luxury, balance, and flow. Click any package to personalize your duration and travelers instantly.
          </p>

          {/* Elegant Category Switcher */}
          <div className="flex justify-center mt-10">
            <div className="bg-brand-navy-light/90 border border-slate-700/50 p-1.5 rounded-2xl flex space-x-2 shadow-2xl relative z-10">
              <button
                onClick={() => setActiveCategory('Domestic')}
                className={`px-6 py-3 rounded-xl font-display font-bold text-sm tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === 'Domestic'
                    ? "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Domestic Getaways
              </button>
              <button
                onClick={() => setActiveCategory('International')}
                className={`px-6 py-3 rounded-xl font-display font-bold text-sm tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === 'International'
                    ? "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                International Escapes
              </button>
            </div>
          </div>
        </div>

        {/* Categories Anchor Target for smooth scroll accuracy */}
        <div id="packages-list" className="scroll-mt-32">
          {/* Bento-style Package Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-brand-navy-light/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 hover:shadow-2xl hover:shadow-black/40 group flex flex-col justify-between transition-all duration-300"
                >
                  <div className="relative">
                    {/* Package Image */}
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-navy-light to-transparent z-10" />
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating Badge (Type and Duration) */}
                      <span className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-sm border border-brand-gold/40 text-brand-gold font-display font-semibold text-xs px-3 py-1.5 rounded-full z-20 flex items-center space-x-1.5 shadow-md">
                        <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{pkg.duration} Days</span>
                      </span>

                      {/* Floating Rating Card */}
                      <span className="absolute top-4 right-4 bg-brand-navy/95 backdrop-blur-sm text-slate-100 font-sans font-bold text-xs px-2.5 py-1.5 rounded-full z-20 flex items-center space-x-1 shadow-md">
                        <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
                        <span>{pkg.rating.toFixed(1)}</span>
                      </span>
                    </div>

                    {/* Meta info & Description */}
                    <div className="px-6 pt-2 pb-6 space-y-4">
                      {/* Destination and Meta tags */}
                      <div className="flex items-center space-x-1 text-xs font-mono text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span className="tracking-wider uppercase">{pkg.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-gold transition-colors duration-200">
                        {pkg.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-sm text-slate-400 leading-relaxed line-clamp-3">
                        {pkg.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        {pkg.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                            <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                            <span className="leading-tight">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="px-6 pb-6 pt-4 border-t border-slate-800/80 bg-brand-navy-light/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-mono text-slate-500 text-[10px] uppercase tracking-widest leading-none mb-1">
                        Private Tour
                      </span>
                      <span className="font-sans text-sm font-bold text-brand-gold">
                        {pkg.priceEstimate}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-display font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all duration-200 cursor-pointer shadow-md hover:shadow-brand-gold/10"
                    >
                      <span>Custom Design</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
