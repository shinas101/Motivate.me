import { useEffect, useState } from "react";
import quotesData from "./data/quotes.json";
import imageSetOne from "./data/shutterstock_1_100.json";
import imageSetTwo from "./data/shutterstock_101_200.json";
import imageSetThree from "./data/shutterstock_201_300.json";
import imageSetFour from "./data/shutterstock_301_400.json";
import { GoogleGenAI } from "@google/genai";



const images = [...imageSetOne.images, ...imageSetTwo.images, ...imageSetThree.images, ...imageSetFour.images];

type QuoteItem = {
  quote: string;
  author: string;
};

type ImageItem = {
  image: string;
};

type aiquote = {
  quote: string;
  author: string;
}

type Content = QuoteItem | ImageItem | aiquote;

type geminiApikey = {
  apiKey: string;
}

function App() {
  const [quote, setQuote] = useState<Content | null>(null);
  // const [aiKey, setAiKey] = useState<geminiApikey>({ apiKey: "" });
  const [aiKey, setAiKey] = useState<geminiApikey>(() => {
    const stored = localStorage.getItem("gemini_api_key");
    return { apiKey: stored ?? "" };
  });
  useEffect(() => {
    localStorage.setItem("gemini_api_key", aiKey.apiKey);
  }, [aiKey]);

  // const randomQuote = useMemo(() => {
  //   return quotesData[Math.floor(Math.random() * quotesData.length)];
  // }, []);
//     const randomQuote = (): Content => {
//       return Math.random() < 0.9
//         ? quotesData[Math.floor(Math.random() * quotesData.length)]
//         : { image: images[Math.floor(Math.random() * images.length)] };
// };
const rnquote = async (): Promise<Content> => {
  const choice = Math.floor(Math.random() * 3);

    if (choice === 0) {
      return quotesData[Math.floor(Math.random() * quotesData.length)];
    }

    if (choice === 1) {
      return {
        image: images[Math.floor(Math.random() * images.length)],
      };
    }
    if (!aiKey.apiKey) {
      return quotesData[Math.floor(Math.random() * quotesData.length)];}
    else {
    const ai = new GoogleGenAI({
      apiKey: aiKey.apiKey,
    });  
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `
    Return ONLY raw JSON.
    Do not wrap in markdown.
    Do not use \`\`\`json.
    give motivational quote from movies,tv shows, series, cartoons , articles, books,philosophy.Also give credit to the show name and actor. all lanfuages are accepted.
    Format:
    {
      "quote": "...",
      "author": "...",
      "movie": "..." | "tv show" | "series" | "cartoon" | "article" | "book" | "philosophy"
    }
    `,
    });
    

    try {
      const data = JSON.parse(response.text!);

      return {
        quote: data.quote,
        author: `${data.author} • ${data.movie}`,
      };
    } catch {
      return {
        quote: response.text ?? "Stay motivated!",
        author: "Unknown",
      };
    }}
  };

return  (
  <div className="flex items-center justify-center min-h-screen bg-[#f4f1e8] p-4">
    <div className="w-full max-w-md border-2 border-[#4a5568] bg-[#fffdf7] p-6 shadow-[6px_6px_0px_#4a5568]">
      <h1 className="text-2xl font-bold text-[#4a5568] mb-6 tracking-tight">
        Motivation App
      </h1>

      <div className="border-2 border-[#a0aec0] bg-[#f8fafc] p-4 min-h-[120px] flex items-center justify-center">
        {quote ? (
          "quote" in quote ? (
            <p className="text-[#2d3748] text-sm leading-relaxed">
              "{quote.quote}"
              <br />
              - {quote.author}
            </p>
          ) : (
            <img
              src={quote.image}
              alt="Motivational"
              className="max-h-48 object-cover"
            />
          )
        ) : (
          <p className="text-[#718096] text-sm">
            Press the button for a quote.
          </p>
        )}
      </div>

      <button
        className="mt-4 px-3 py-2 text-xs font-semibold uppercase tracking-wider border-2 border-[#4a5568] bg-[#d6e4d4] text-[#2d3748] hover:bg-[#c3d8c0]"
        onClick={() => rnquote().then(setQuote)}
      >
        Motivate Me
      </button>
      <input
        type="password"
        placeholder="Enter Gemini API Key"
        autoComplete="off"
        className="mt-4 w-full px-3 py-2 text-xs border-2 border-[#4a5568] bg-[#f8fafc] text-[#2d3748]"
        value={aiKey.apiKey}
        onChange={(e) => setAiKey({ apiKey: e.target.value })}
      />
      <button className="mt-2 px-2 py-0.5 text-[9px] font-semibold uppercase border-2 border-[#4a5568] bg-[#d6e4d4] text-[#2d3748] hover:bg-[#c3d8c0]" onClick={() => setAiKey({ apiKey: "" })}>
        Clear API Key
      </button>
      <button className="mt-2 px-2 py-0.5 text-[9px] font-semibold uppercase border-2 border-[#4a5568] bg-[#d6e4d4] text-[#2d3748] hover:bg-[#c3d8c0]" onClick={() => alert(`Current API Key: ${aiKey.apiKey || "None"}`)}>
        View API Key
      </button>
    </div>
  </div>
);}

export default App;
