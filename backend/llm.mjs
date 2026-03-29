

import { config } from "dotenv";
config();

import { ChatGroq } from "@langchain/groq";

export const llm = new ChatGroq({
    temperature: 0.7,
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY
});

export const classifierLlm = new ChatGroq({
    temperature: 0.2,
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY
});