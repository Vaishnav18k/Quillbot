import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

// Your strict system instructions—absolutely cannot be overridden:
const STRICT_SYSTEM_PROMPT = `
You are an expert English editor and paraphraser. Your ONLY job is to:
- Correct all grammar and spelling mistakes in the user's input.
- Paraphrase the input into a new, clear, natural English sentence that is completely different from the original.
- NEVER echo the original words or phrasing, even for very short inputs.
- DO NOT include explanations, greetings, commentary, confirmations, or any extra text.
Output EXACTLY one single sentence (the paraphrase) and NOTHING ELSE.
`.trim();

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
    //   console.error('Missing Anthropic API key');
      return new Response(
        JSON.stringify({ error: 'Server misconfiguration: missing API key' }),
        { status: 500 }
      );
    }

    // Build the Anthropic-style messages array
    const anthroMessages = [
      { role: 'system', content: STRICT_SYSTEM_PROMPT },
      // We assume incoming messages are [{ role: 'user', content: '...' }, …]
      ...messages
    ];

    // Kick off the streaming call
    const aiStream = await streamText({
      model: anthropic('claude-4-opus-20250514'),
      system: STRICT_SYSTEM_PROMPT,
      messages: anthroMessages, 
    });

    // Wrap the SSE response so clients can consume a text/event-stream
    const streamResponse = aiStream.toDataStreamResponse();
    streamResponse.headers.set('Content-Type', 'text/event-stream');
    return streamResponse;

  } catch (err: any) {
    // console.error('API error:', err);
    const message = err.message || 'Unknown error';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
