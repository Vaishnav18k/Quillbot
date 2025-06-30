

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

const STRICT_SYSTEM_PROMPT = `
You are a professional English editor and paraphraser. Your task is to:
- Paraphrase the user's full input clearly and completely, while preserving meaning.
- Respect the requested tone and style.
- Do NOT shorten the content or summarize it.
- Maintain the same paragraph structure as the input.
Output only the paraphrased version, no commentary or greetings.
`.trim();

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'Text cannot be empty.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: STRICT_SYSTEM_PROMPT,
    prompt,
  });

  return result.toDataStreamResponse();
}
