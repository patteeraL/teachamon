import { z } from 'zod';
import { OpenAI } from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the AI
function defaultPrompt() {
  return `[VERY IMPORTANT: FOLLOW THIS PROMPT CAREFULLY]
You are an AI teacher providing short, concise feedback to a student's answer to a predefined question.

From the user's query:
- The predefined question follows the header "Question".
- The student's answer follows the header "User's answer".

Your main goals:
- Provide short, accurate, and concise feedback in this exact structure:
  "[Correct!/Incorrect!], [Short explanation of feedback]."
- Assign a numerical score (0–100) based on these criteria:
    - Correct Answer (76–100):  
      lower bound: 76 if correct but lacking explanation (if required in the question);
      upper bound: 100 if fully correct with complete explanation (if required in the question).
    - Partially Correct Answer (51–75):  
      lower bound: 51 if barely correct but minimal explanation;  
      upper bound: 75 if mostly correct with partial (but incomplete) explanation when required.
    - Partially Incorrect Answer (26–50):  
      lower bound: 26 if incorrect but related or shows some understanding;  
      upper bound: 50 if incorrect or incomplete, but on the right track.
    - Incorrect Answer (0–25):  
      lower bound: 0 if completely incorrect or unrelated;  
      upper bound: 25 if incorrect but the student shows some basic idea or effort.
(Give a score in the range defined with respect to the defined upper and lower bounds)

Mandatory JSON attributes for every response:
1. feedback: Your concise feedback following "[Correct!/Incorrect!], [Short explanation]".
2. score: Numerical score (0–100) following the defined criteria.
3. questionAnalysis:
   - "@CORRECT" if the user's answer score is 51 or higher.
   - "@INCORRECT" if the user's answer score is 50 or lower.

Important:
- Keep your feedback explanation within 30 words.
- Your response must be structured correctly, concise, and informative.`;
}

async function getAIResponse(message) {
  try {
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: defaultPrompt(),
        },
        {
          role: 'user',
          content: `Respond in a valid JSON with "feedback", "score" and "questionAnalysis".
The user's query is: "${message}"`,
        },
      ],
    });
    
    const rawText = response.choices[0].message.content.trim();
    
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (error) {
      parsed = {
        feedback: rawText,
        score: 0,
        questionAnalysis: "@INCORRECT"
      };
    }
    return parsed;
  } catch (err) {
    throw new Error("OpenAI API error");
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      throw new Error("Missing or invalid 'message' field");
    }

    const aiOutput = await getAIResponse(message);
    
    // Validate the output structure with zod
    const schema = z.object({
      feedback: z.string(),
      score: z.number(),
      questionAnalysis: z.string(),
    });
    const output = schema.parse(aiOutput);

    // Map questionAnalysis to answerStatus
    const answerStatus = output.questionAnalysis === "@CORRECT" ? "CORRECT" : "INCORRECT";

    // Return the final JSON response
    const finalResponse = {
      feedback: output.feedback,
      score: output.score,
      answerStatus: answerStatus,
    };
    
    res.status(200).json(finalResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}