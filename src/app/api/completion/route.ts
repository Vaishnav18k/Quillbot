

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

const STRICT_SYSTEM_PROMPT = `
You are an expert English editor and paraphraser. Your ONLY job is to:
- Correct all grammar and spelling mistakes in the user's input.
- Paraphrase the input into a new, clear, natural English sentence that is completely different from the original.
- NEVER echo the original words or phrasing, even for very short inputs.
- DO NOT include explanations, greetings, commentary, confirmations, or any extra text.
Output EXACTLY one single sentence (the paraphrase) and NOTHING ELSE.
`.trim();

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: STRICT_SYSTEM_PROMPT,
    prompt,
  });

  return result.toDataStreamResponse();
}
