export interface Package {
  id: string;
  title: string;
  type: 'Domestic' | 'International';
  duration: number; // in days
  location: string;
  image: string;
  priceEstimate: string;
  rating: number;
  tags: string[];
  description: string;
  highlights: string[];
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  tripType: 'Domestic' | 'International';
  days: number;
  travelDate: string;
  travelers: number;
  additionalRequirements: string;
}

export interface QuoteResponseState {
  referenceId: string;
  itineraryMarkdown: string;
  receivedAt: string;
}

export const TRAVEL_PACKAGES: Package[] = [
  {
    id: "pkg-goa",
    title: "Sunkissed Goa & Western Ghats",
    type: "Domestic",
    duration: 5,
    location: "Goa, India",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    priceEstimate: "Starts at ₹18,500 / person",
    rating: 4.8,
    tags: ["Beach Escape", "heritage", "Spice estates"],
    description: "An elegant exploration blending pristine, hidden sands of South Goa, vintage Portuguese estates in Fontainhas, and organic spice plantation tours.",
    highlights: ["Private sunset yacht sail", "Heritage Portuguese villa lunch", "Guided forest trek to Dudhsagar waterfall"]
  },
  {
    id: "pkg-ladakh",
    title: "Leh-Ladakh Mystical Peaks",
    type: "Domestic",
    duration: 7,
    location: "Ladakh, India",
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80",
    priceEstimate: "Starts at ₹29,000 / person",
    rating: 4.9,
    tags: ["Mountains", "Adventure", "Monasteries"],
    description: "An awe-inspiring high-altitude odyssey. Traverse spectacular road passes, view the cobalt Pangong Tso, and explore centuries-old monasteries.",
    highlights: ["Drive through Khardung La", "Luxury glamping by Nubra Valley sand dunes", "Double-humped camel safari ride"]
  },
  {
    id: "pkg-kerala",
    title: "Tranquil Backwaters of Kerala",
    type: "Domestic",
    duration: 6,
    location: "Alleppey & Munnar, India",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    priceEstimate: "Starts at ₹22,000 / person",
    rating: 4.7,
    tags: ["Wellness", "Nature", "Houseboat"],
    description: "Rejuvenate yourself on a customized backwater voyage. Indulge in authentic Ayurvedic massages and roam the lush green tea slopes of Munnar.",
    highlights: ["Overnight stay in a private wooden houseboat", "Tea tasting plantation tour", "Kathakali cultural dance performance"]
  },
  {
    id: "pkg-amalfi",
    title: "Amalfi Coast & Roman Odyssey",
    type: "International",
    duration: 8,
    location: "Campania & Rome, Italy",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80",
    priceEstimate: "Starts at ₹1,75,000 / person",
    rating: 4.9,
    tags: ["Coastal drive", "Culinary", "Colosseum"],
    description: "Behold Cliffside colorful villages and rich historic ruins. Speed through Positano, taste freshly pressed limoncello, and witness Rome's ancient grandeur.",
    highlights: ["Private speed-boat cave tour in Capri", "Hands-on woodfire pizza class in Naples", "Skip-the-line VIP Colosseum underground access"]
  },
  {
    id: "pkg-japan",
    title: "Japan: Shrines & Neon Horizons",
    type: "International",
    duration: 9,
    location: "Tokyo, Kyoto & Osaka, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    priceEstimate: "Starts at ₹2,05,000 / person",
    rating: 5.0,
    tags: ["Culture", "Sci-Fi", "Temples"],
    description: "The ultimate hyper-modern meets sacred tradition experience. Cruise on the Shinkansen bullet train, explore serene red torii gates, and dine in hidden izakayas.",
    highlights: ["Traditional tea ceremony in Gion, Kyoto", "Sushi making masterclass with a master chef", "Bespoke digital art exhibition reservation"]
  },
  {
    id: "pkg-santorini",
    title: "Kyklades: Santorini & Athens Grandeur",
    type: "International",
    duration: 7,
    location: "Santorini & Athens, Greece",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    priceEstimate: "Starts at ₹1,50,000 / person",
    rating: 4.8,
    tags: ["Aegean Sunset", "Mythology", "Islands"],
    description: "Immerse yourself in spectacular Mediterranean sights. View iconic cobalt domes of Oia, relax on dramatic volcanic black beaches, and unlock Acropolis secrets.",
    highlights: ["Luxury catamaran sunset cruise with BBQ", "Boutique cave hotel with caldera plunge pool", "Private historian guided tour of partisan temples"]
  }
];
