import { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, Clock, HelpCircle, Instagram } from "lucide-react";

export default function ContactSection() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const address = "C 19, Unit -3, First Floor, Street Number 10, Chattarpur Enclave Phase 2, New Delhi";

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const faqs = [
    {
      q: "How does the custom package designing work?",
      a: "Our interactive AI engine drafts an instant itinerary based on your initial destinations, duration, and preferences. After submission, a human luxury travel advisor from Junkies Paradise refines the itinerary, schedules your luxury hotels, private guides, and transport details, and presents the definitive, finalized price quotation."
    },
    {
      q: "What is your typical turnaround time for custom quotes?",
      a: "While your initial digital blueprint is generated instantly on this page, a detailed personalized quotation from our travel advisors with hotel rates and bespoke private transport schedules is delivered to your email within 24 hours of submission."
    },
    {
      q: "Can I adjust the itinerary details during our trip?",
      a: "Absolutely. Every luxury traveler with Junkies Paradise has access to a dedicated WhatsApp concierge active 24/7. We can adjust local bookings, suggest culinary hotspots, or reschedule guided routes in real-time while you wander."
    }
  ];

  return (
    <section id="contact" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Connect With Our <span className="font-serif italic text-brand-gold">Travel Concierge</span>
          </h2>
          <p className="font-sans text-slate-400 text-lg leading-relaxed">
            Have questions about our itineraries, booking procedures, or custom corporate excursions? Our concierge is waiting to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* COLUMN 1: DIRECT CHANNELS & ADDRESS - Col Span 5 */}
          <div className="lg:col-span-5 bg-brand-navy-light/30 border border-slate-800 p-8 sm:p-10 rounded-3xl flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Office Headquarters</h3>
                <p className="text-sm text-slate-400">Feel free to schedule an in-person bespoke consultation with our travel designers.</p>
              </div>

              {/* Channels list */}
              <div className="space-y-6">
                {/* Physical Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-gold/15 rounded-xl border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-brand-gold uppercase tracking-widest leading-none">
                      Physical Location
                    </p>
                    <p className="text-sm font-sans text-slate-200 leading-relaxed max-w-xs">
                      C 19, Unit -3, First Floor, Street Number 10, Chattarpur Enclave Phase 2
                    </p>
                    <button
                      onClick={copyAddressToClipboard}
                      className="inline-flex items-center space-x-1.5 text-xs text-brand-gold hover:text-white transition duration-200 cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Physical Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-gold/15 rounded-xl border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-brand-gold uppercase tracking-widest leading-none mb-1">
                      Direct Email
                    </span>
                    <a
                      href="mailto:junkies.paradise2@gmail.com"
                      className="text-sm font-sans text-slate-200 hover:text-brand-gold transition duration-200 block"
                    >
                      junkies.paradise2@gmail.com
                    </a>
                  </div>
                </div>

                {/* Telephone Support */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-gold/15 rounded-xl border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-brand-gold uppercase tracking-widest leading-none mb-1">
                      Phone &amp; WhatsApp Support
                    </span>
                    <a
                      href="tel:+918800407009"
                      className="text-sm font-sans text-slate-200 hover:text-brand-gold transition duration-200 font-semibold block"
                    >
                      +91 88004 07009
                    </a>
                  </div>
                </div>

                {/* Hours of support */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-brand-gold/15 rounded-xl border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-brand-gold uppercase tracking-widest leading-none mb-1">
                      Operating Hours
                    </span>
                    <p className="text-sm font-sans text-slate-200 leading-relaxed">
                      Monday — Sunday: 10:00 AM — 08:00 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Seal / Banner */}
            <div className="mt-10 p-4 rounded-2xl bg-brand-navy border border-slate-800 flex items-center space-x-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-bounce"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-xs text-slate-400">
                Live Support active. You can write us on Instagram or initiate quotes above.
              </p>
            </div>
          </div>

          {/* COLUMN 2: CUSTOM FAQS INGRID - Col Span 7 */}
          <div className="lg:col-span-7 bg-brand-navy-light/10 border border-slate-850 p-8 sm:p-10 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center space-x-2.5">
                <HelpCircle className="w-5 h-5 text-brand-gold" />
                <span>Frequently Answered Queries</span>
              </h3>
              
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-950/45 border border-slate-850 p-5 rounded-2xl">
                    <h4 className="font-display font-extrabold text-sm text-brand-gold mb-2 leading-snug">
                      Q: {faq.q}
                    </h4>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Connection banner */}
            <div className="mt-8 pt-8 border-t border-slate-800/85 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">Interact with our community of 10,000+ travelers:</span>
              <a
                href="https://www.instagram.com/junkies_paradise_?igsh=ZHJxcWZpem91ZWU2"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center space-x-2.5 bg-brand-gold text-brand-navy rounded-xl px-4 py-2 text-xs font-black uppercase hover:bg-brand-gold-hover transition duration-200"
              >
                <Instagram className="w-4 h-4" />
                <span>@junkies_paradise_</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
