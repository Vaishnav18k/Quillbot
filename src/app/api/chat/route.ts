

// import { anthropic } from '@ai-sdk/anthropic';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = streamText({
//     model: anthropic('claude-4-opus-20250514'),
//     system: 'You are a helpful assistant.',
//     messages,
//   });

//   return result.toDataStreamResponse();
// }



import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    // Check for Anthropic API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Missing Anthropic API key');
      return new Response(JSON.stringify({ error: 'Missing Anthropic API key' }), { status: 500 });
    }

    const result = streamText({
      model: anthropic('claude-3-haiku-20240307'),
      system: 'You are a helpful assistant.',
      messages,
    });

    return result.toDataStreamResponse();
  } catch (err: any) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Anthropic API error' }), { status: 500 });
  }
}

// console.log(Messages)
