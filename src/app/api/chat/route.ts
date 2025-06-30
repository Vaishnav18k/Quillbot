// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

// // Your strict system instructions—absolutely cannot be overridden:
// const STRICT_SYSTEM_PROMPT = `
// You are an expert English editor and paraphraser. Your ONLY job is to:
// - Correct all grammar and spelling mistakes in the user's input.
// - Paraphrase the input into a new, clear, natural English sentence that is completely different from the original.
// - NEVER echo the original words or phrasing, even for very short inputs.
// - DO NOT include explanations, greetings, commentary, confirmations, or any extra text.
// Output EXACTLY one single sentence (the paraphrase) and NOTHING ELSE.
// `.trim();

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // Validate API key
//     const apiKey = process.env.OPENAI_API_KEY;
//     if (!apiKey) {
//     //   console.error('Missing OpenAI API key');
//       return new Response(
//         JSON.stringify({ error: 'Server misconfiguration: missing API key' }),
//         { status: 500 }
//       );
//     }

//     // Build the OpenAI-style messages array
//     const openaiMessages = [
//       { role: 'system', content: STRICT_SYSTEM_PROMPT },
//       // We assume incoming messages are [{ role: 'user', content: '...' }, …]
//       ...messages
//     ];

//     // Kick off the streaming call
//     const aiStream = await streamText({
//       model: openai('gpt-3.5-turbo'),
//       system: STRICT_SYSTEM_PROMPT,
//       messages: openaiMessages, 
      
//     });

//     // Wrap the SSE response so clients can consume a text/event-stream
//     const streamResponse = aiStream.toDataStreamResponse();
//     streamResponse.headers.set('Content-Type', 'text/event-stream');
//     return streamResponse;

//   } catch (err: any) {
//     // console.error('API error:', err);
//     const message = err.message || 'Unknown error';
//     return new Response(JSON.stringify({ error: message }), { status: 500 });
//   }
// }