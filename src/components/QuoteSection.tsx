import { useState, useEffect, useRef } from "react";
import { QuoteFormData, QuoteResponseState, Package } from "../types";
import { Send, FileText, Sparkles, Download, Check, RefreshCw, AlertTriangle, Play, Globe2, Save, Trash2, Calendar, ClipboardCheck, Compass } from "lucide-react";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

interface QuoteSectionProps {
  selectedPackage: Package | null;
  onClearSelectedPackage: () => void;
}

const INSPIRING_MESSAGES = [
  "Mapping hidden local pathways...",
  "Querying coordinates for optimal sensory spots...",
  "Consulting our luxury concierge advisors...",
  "Curating prime culinary selections and sunset vistas...",
  "Arranging seamless day-by-day transport flow...",
  "Generating final bespoke PDF-ready documentation..."
];

export default function QuoteSection({ selectedPackage, onClearSelectedPackage }: QuoteSectionProps) {
  // Initial state for form
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    tripType: "Domestic",
    days: 5,
    travelDate: "",
    travelers: 1,
    additionalRequirements: ""
  });

  // State managers
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);
  const [currentItinerary, setCurrentItinerary] = useState<QuoteResponseState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedItineraries, setSavedItineraries] = useState<QuoteResponseState[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const quoteResultsRef = useRef<HTMLDivElement>(null);

  // Sync selected package from parent component
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        destination: selectedPackage.location,
        tripType: selectedPackage.type,
        days: selectedPackage.duration,
        additionalRequirements: `Inspired by "${selectedPackage.title}". Specific goals: `
      }));

      // Focus on Full Name input so they can start filling details
      const nameInput = document.getElementById("fullName");
      if (nameInput) {
        nameInput.focus();
      }
    }
  }, [selectedPackage]);

  // Handle stored itineraries on mount
  useEffect(() => {
    const listJson = localStorage.getItem("jp_saved_itineraries");
    if (listJson) {
      try {
        setSavedItineraries(JSON.parse(listJson));
      } catch (e) {
        console.error("Failed to parse saved itineraries", e);
      }
    }
  }, []);

  // Loading message rotation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingMessageIdx(prev => (prev + 1) % INSPIRING_MESSAGES.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'days' || name === 'travelers' ? Number(value) : value
    }));
  };

  const executeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "A secure server connection could not be established.");
      }

      const newItinerary: QuoteResponseState = {
        referenceId: data.referenceId,
        itineraryMarkdown: data.itineraryMarkdown,
        receivedAt: data.receivedAt
      };

      setCurrentItinerary(newItinerary);
      
      // Auto save to local history list
      const updatedList = [newItinerary, ...savedItineraries].slice(0, 5); // Limit to last 5
      setSavedItineraries(updatedList);
      localStorage.setItem("jp_saved_itineraries", JSON.stringify(updatedList));
      setIsSaved(true);

      // Scroll smoothly to results once generated
      setTimeout(() => {
        quoteResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An error occurred. Check your API settings if generating continues to fail.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (!currentItinerary) return;
    navigator.clipboard.writeText(currentItinerary.itineraryMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerExport = () => {
    if (!currentItinerary) return;
    const element = document.createElement("a");
    const file = new Blob([currentItinerary.itineraryMarkdown], { type: "text/markdown;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${currentItinerary.referenceId}-${formData.destination.replace(/\s+/g, '-').toLowerCase()}-itinerary.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const removeSaved = (refId: string) => {
    const updated = savedItineraries.filter(item => item.referenceId !== refId);
    setSavedItineraries(updated);
    localStorage.setItem("jp_saved_itineraries", JSON.stringify(updated));
    if (currentItinerary?.referenceId === refId) {
      setIsSaved(false);
    }
  };

  const loadSaved = (itinerary: QuoteResponseState) => {
    setCurrentItinerary(itinerary);
    setIsSaved(true);
    setTimeout(() => {
      quoteResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section id="quote" className="py-24 bg-slate-950 text-slate-100 relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 bg-brand-gold/10 px-3.5 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-brand-gold">
              Interactive Blueprint
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Request A Free Quote <span className="font-serif italic text-brand-gold">&amp; Get AI Itinerary</span>
          </h2>
          <p className="font-sans text-slate-400 text-lg leading-relaxed">
            Fill out your dream preferences below. Our advanced server engines will instantly craft a comprehensive day-by-day travel itinerary preview just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: THE FORM - Col Span 7 */}
          <div className="lg:col-span-7 bg-brand-navy-light/40 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            {/* Show Badge when pre-selected package is loaded */}
            {selectedPackage && (
              <div className="bg-brand-gold/10 border border-brand-gold/40 rounded-2xl p-4 mb-8 flex items-center justify-between animate-fade-in">
                <div className="flex items-center space-x-3">
                  <Globe2 className="w-5 h-5 text-brand-gold" />
                  <div>
                    <p className="text-xs text-brand-gold uppercase tracking-wider font-mono">
                      Selected Base Package
                    </p>
                    <p className="text-sm font-bold text-white">
                      {selectedPackage.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClearSelectedPackage}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Reset Form
                </button>
              </div>
            )}

            <form onSubmit={executeSubmit} className="space-y-6">
              
              {/* Row 1: Full Name */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Full Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="E.g. Alexander Vance"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition duration-200"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Email Address <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition duration-200"
                  />
                </div>
              </div>

              {/* Row 3: Destination & Trip Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="destination" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Travel Destination <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    required
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="E.g. Amalfi, Italy or Ladakh, India"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="tripType" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Trip Type <span className="text-brand-gold">*</span>
                  </label>
                  <select
                    id="tripType"
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-brand-gold transition duration-200"
                  >
                    <option value="Domestic">Domestic getaway</option>
                    <option value="International">International Escape</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Duration, Travel Date, Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="days" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Duration (Days) <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="number"
                    id="days"
                    name="days"
                    min="1"
                    max="30"
                    required
                    value={formData.days}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="travelDate" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Estimated Date
                  </label>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="travelers" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Travelers <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="number"
                    id="travelers"
                    name="travelers"
                    min="1"
                    max="100"
                    required
                    value={formData.travelers}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition duration-200"
                  />
                </div>
              </div>

              {/* Row 5: Additional Requirements */}
              <div>
                <label htmlFor="additionalRequirements" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  rows={4}
                  value={formData.additionalRequirements}
                  onChange={handleInputChange}
                  placeholder="Tell us about your interests, pacing preferences, hotel stars (e.g. 5-star, boutique, homestay), food constraints, or active experiences you crave..."
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition duration-200"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-display font-black tracking-wider uppercase text-base text-brand-navy py-4.5 rounded-xl flex items-center justify-center space-x-3 cursor-pointer shadow-lg transition-all duration-300 ${
                  isSubmitting
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed scale-98"
                    : "bg-brand-gold hover:bg-brand-gold-hover shadow-brand-gold/10 hover:shadow-brand-gold/25 transform hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Processing Custom Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Request Free Quote</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* RIGHT: SAVED CUSTOM QUOTES HISTORY - Col Span 5 */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* INSPIRING LIVE UPDATES BAR */}
            <AnimatePresence mode="wait">
              {isSubmitting && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-brand-navy-light border border-brand-gold/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden h-64"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                    <div className="h-full bg-brand-gold animate-progress-stripes" style={{ width: "100%" }} />
                  </div>
                  <Globe2 className="w-12 h-12 text-brand-gold animate-bounce mb-3" />
                  <p className="font-serif italic text-lg text-white mb-2">
                    Crafting Your Custom Escape
                  </p>
                  <p className="font-mono text-xs text-brand-gold/80 uppercase tracking-widest animate-pulse h-10 flex items-center justify-center">
                    {INSPIRING_MESSAGES[loadingMessageIdx]}
                  </p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-2">
                    Using Gemini 3.5-flash Engine
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ERROR PRESENTATION (E.G. MISSING API KEY) */}
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-red-200">
                <div className="flex items-start space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-white text-base">
                      Interactive Generation Standby
                    </h4>
                    <p className="font-sans text-sm text-slate-300 mt-1">
                      {errorMessage.includes("GEMINI_API_KEY") ? (
                        <span>
                          To unlock instantly-crafted bespoke luxury itineraries on this server, please add your 
                          <strong className="text-white"> GEMINI_API_KEY</strong> via the 
                          <strong className="text-white"> Settings &gt; Secrets</strong> panel in the AI Studio UI.
                        </span>
                      ) : (
                        errorMessage
                      )}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-3 border border-red-500/10 font-mono text-[11px] text-slate-400">
                  Code: 503_TEMPORARY_STANDBY_SECRET
                </div>
              </div>
            )}

            {/* SAVED BLUPEPRINTS LIST CARD */}
            <div className="bg-brand-navy-light/20 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
              <h3 className="font-display font-bold text-lg text-white flex items-center space-x-2.5 mb-6">
                <FileText className="w-5 h-5 text-brand-gold" />
                <span>Your Bespoke Itinerary Vault ({savedItineraries.length})</span>
              </h3>

              {savedItineraries.length === 0 ? (
                <div className="text-center py-10 text-slate-500 space-y-4">
                  <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                    <Calendar className="w-6 h-6 text-slate-600 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-400">No itineraries generated yet</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Fill the quote form or select a spotlight package to generate your first custom travel document.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedItineraries.map((item, idx) => (
                    <div
                      key={item.referenceId}
                      className={`group p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        currentItinerary?.referenceId === item.referenceId
                          ? "bg-brand-navy-light/80 border-brand-gold/60 shadow-lg shadow-brand-gold/5"
                          : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                      onClick={() => loadSaved(item)}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                          <Compass className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-brand-gold uppercase tracking-wider">
                              {item.referenceId}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              • {new Date(item.receivedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">
                            Bespoke Travel Guide
                          </p>
                        </div>
                      </div>

                      {/* Delete option */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSaved(item.referenceId);
                        }}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
                        title="Remove itinerary record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* RESULTS SECTION: REVEAL CUSTOM GENERATED ITINERARY */}
        <AnimatePresence>
          {currentItinerary && (
            <motion.div
              ref={quoteResultsRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-20 scroll-mt-28"
            >
              <div className="bg-brand-navy-light/40 border border-brand-gold/30 rounded-3xl overflow-hidden shadow-2xl shadow-brand-gold/5">
                
                {/* Header Banner representing corporate luxury document */}
                <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light border-b border-brand-gold/30 p-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold flex items-center justify-center text-brand-navy">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-brand-gold tracking-widest uppercase">
                          Reference ID: {currentItinerary.referenceId}
                        </span>
                        <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-full">
                          AI Verified
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                        Your Tailored Travel Itinerary
                      </h3>
                    </div>
                  </div>

                  {/* Actions (Copy / Download Markdown) */}
                  <div className="flex items-center space-x-3.5 self-stretch sm:self-auto">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer"
                      title="Copy itinerary as markdown text"
                    >
                      {copied ? (
                        <>
                          <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copy Itinerary</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={triggerExport}
                      className="flex-1 sm:flex-initial bg-brand-gold hover:bg-brand-gold-hover text-brand-navy rounded-xl px-4 py-2.5 text-xs font-black uppercase flex items-center justify-center space-x-1.5 transition cursor-pointer shadow-md"
                      title="Save text description locally as markdown"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download File</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Banner informing about physical inquiry copy */}
                <div className="bg-brand-gold/10 px-6 sm:px-10 py-3.5 border-b border-brand-gold/20 flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <p className="text-xs text-slate-300">
                    A quote reference has been logged. Our concierge will follow up at <span className="text-brand-gold font-bold">{formData.email}</span> within 24 hours.
                  </p>
                </div>

                {/* Markdown Container */}
                <div className="px-6 sm:px-10 py-10 md:py-14 bg-slate-950/80 prose prose-invert max-w-none border-b border-slate-800">
                  <div className="markdown-body">
                    <Markdown>{currentItinerary.itineraryMarkdown}</Markdown>
                  </div>
                </div>

                {/* Footer block of Document */}
                <div className="bg-slate-900/60 p-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs font-mono gap-4">
                  <span>© Junkies Paradise Document Management Service</span>
                  <span>System Stamp: {new Date(currentItinerary.receivedAt).toLocaleString()}</span>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
