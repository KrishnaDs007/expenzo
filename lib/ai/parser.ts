import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are an expense parser. Extract structured data from natural language expense descriptions.
Always respond with valid JSON only. No explanation, no markdown.

JSON schema:
{
  "amount": number,
  "description": string,
  "category": "Food" | "Travel" | "Auto" | "Shopping" | "Entertainment" | "Utilities" | "Health" | "Other",
  "date": "YYYY-MM-DD",
  "paymentMethod": "Cash" | "UPI" | "GPay" | "PhonePe" | "Card" | "Other",
  "paidBy": "me",
  "splitWith": string[],
  "splitType": "none" | "equal" | "custom",
  "isRecurring": boolean,
  "recurringInterval": "monthly" | "weekly" | "yearly" | "none",
  "confidence": number
}

Rules:
- "yesterday" → subtract 1 day from today
- "gpay" → paymentMethod: "GPay"
- If people are mentioned after "with", add them to splitWith
- Default splitType to "equal" when splitWith is non-empty
- confidence: 0–1 based on how clear the input was
- Today's date: ${new Date().toISOString().split('T')[0]}`;

export async function parseExpenseWithGemini(input: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: input }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    console.log("Raw Gemini Output:", responseText);

    // Clean up potential markdown blocks if the model somehow includes them despite instructions
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to parse expense");
  }
}
