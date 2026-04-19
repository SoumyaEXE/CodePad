import Groq from "groq-sdk";

export const groqClient = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || "",
  dangerouslyAllowBrowser: true, // required for client-side rendering
});

export const MODEL = "llama-3.3-70b-versatile";
