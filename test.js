import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyC4GblDyvpfrESuEQGGOwo-jDQwgDoXQl8",
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Generate a motivational quote from movies.Also give credit to the movie name and actor",
});

console.log(response.text);