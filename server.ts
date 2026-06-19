import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables in development
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Set up Gemini SDK lazily to avoid immediate crash if key is missing during initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required to generate custom itineraries.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Get Quote & AI Custom Itinerary Generator endpoint
app.post("/api/quote", async (req: express.Request, res: express.Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      destination,
      tripType, // Domestic or International
      days,
      travelDate,
      travelers,
      additionalRequirements
    } = req.body;

    if (!fullName || !email || !destination || !days) {
      res.status(400).json({ error: "Please provide all required fields: Full Name, Email, Destination, and Days." });
      return;
    }

    // Attempt to invoke Gemini
    const ai = getGeminiClient();
    
    const prompt = `
Generate a luxurious, bespoke, and extremely detailed travel itinerary for:
- Client Name: ${fullName}
- Destination: ${destination}
- Trip Type: ${tripType || "Unspecified"}
- Duration: ${days} days
- Formatted Travel Date: ${travelDate || "Flexible"}
- Number of Travelers: ${travelers || 1}
- Special Notes / Requirements: ${additionalRequirements || "None"}

The itinerary MUST fit the brand mood of "Junkies Paradise", which has the tagline "Explore more. Worry less."
The tone is select, premium, inspiring, and adventurous yet meticulously organized.

Your response in Markdown should be structured as follows:

# ✈️ Paradise Found: Bespoke Custom Itinerary for ${destination}
*Crafted elegantly for ${fullName} (${travelers} travelers)*

## 🌴 Trip Overview
Provide a beautiful, poetic description of the destination and what makes this personal trip type special. Highlight how it matches the slogan "Explore more. Worry less."

---

## 📅 Day-by-Day Journey Planner
Provide a comprehensive day-by-day description for each of the ${days} days. Format each day with an exciting header, such as:
### Day 1: [Dynamic Title]
Inside each day, include:
- **Morning**: Distinctive premium experiences (local breakfast gem, panoramic views, historical monuments, etc.).
- **Afternoon**: High-activity or relaxing explorations.
- **Evening**: Fine dining or handpicked local spots, sunsets, cultural shows.
- Include an *Insider Tip* in italics highlighting security, custom shortcuts, or hidden local hotspots.

---

## 🍽️ Curated Culinary & Luxury Highlights
List 3-5 high-end culinary suggestions or unique boutique accommodations in ${destination} matching this specific trip layout.

---

## 💡 Junkies Paradise Savvy Travel Guidelines
- Provide 4 personalized, practical tips for this trip (local transport, dress advice, currency note, seasonal peak weather custom advice).
- Include a closing line: "Enjoy your paradise. Let us manage the rest!"
`;

    const systemInstruction = `You are a high-end travel planner and direct advisor representing "Junkies Paradise", a luxury custom travel agency. 
You design dream itineraries keeping details precise and adventurous. Your accent is elegant, exciting, and supportive of the "Explore more. Worry less." concept.
Avoid generic boilerplate. Speak directly, confidently, and craft breathtaking sensory experiences. Format all outputs perfectly using rich, readable Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const markdownOutput = response.text;

    // Send back response along with a mock reference ID for the record
    const quoteReferenceId = `JPQ-${Math.floor(100000 + Math.random() * 900000)}`;

    res.json({
      success: true,
      referenceId: quoteReferenceId,
      itineraryMarkdown: markdownOutput,
      receivedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("Gemini itinerary generation failed:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An error occurred while custom crafting your itinerary. Please try again.",
    });
  }
});

// Configure Vite integration
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode: Mount Vite's HMR and middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted for development");
  } else {
    // Production Mode: Serve static files from compiled dist folder
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // SPA Fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static file server active for production");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n============================================`);
    console.log(`Junkies Paradise Server Ready!`);
    console.log(`Running on: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`============================================\n`);
  });
}

setupServer();
