'use client'
import React from 'react'
import Header from '../components/Header'
import { useChat } from '@ai-sdk/react'

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit , status} = useChat({});
  const maxWords = 500;
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="flex items-center gap-2 text-2xl font-bold mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path><path d="m2.3 2.3 7.286 7.286"></path><circle cx="11" cy="11" r="2"></circle></svg>
            Paraphraser
          </h2>
          <p className="text-gray-600 mb-4">Enter the text you want to paraphrase (up to {maxWords} words)</p>

          <div className="mb-4">
            {messages.length > 0 && (
              <div className="mb-4 max-h-60 overflow-y-auto bg-blue-50 rounded-lg p-3 border border-gray-100">
                {messages.map(message => (
                  <div key={message.id} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}> 
                    <span className={
                      message.role === 'user'
                        ? 'inline-block bg-blue-100 text-blue-800 rounded-lg px-3 py-2'
                        : 'inline-block bg-green-100 text-green-800 rounded-lg px-3 py-2'
                    }>
                      <b>{message.role === 'user' ? 'You' : 'AI'}:</b> {message.content}
                      
                    </span>
                  </div>
                  
                ))}
              </div>
              
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <textarea
              className="w-full min-h-[100px] rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Enter your text here..."
              name="prompt"
              value={input}
              onChange={handleInputChange}
              maxLength={maxWords * 8}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{wordCount}/{maxWords} words</span>
              <button
                type="submit"
                disabled={!input.trim() || wordCount > maxWords}
                className="inline-flex items-center justify-center gap-2 font-medium bg-black text-white hover:bg-primary/90 rounded-md px-8 py-3 transition disabled:opacity-50 disabled:pointer-events-none"
              >
                Paraphrase
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




// 'use client';

// import { useChat } from '@ai-sdk/react';
// // import Header from '../components/Header';

// export default function Paraphraser() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat({});

//   return (
//     <>
//     {/* <Header /> */}
//     <div className='justify-center border border-black p-10'>
//       {messages.map(message => (
//         <div key={message.id}>
//           {message.role === 'user' ? 'User: ' : 'AI: '}
//           {message.content}
//         </div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <input name="prompt" value={input} onChange={handleInputChange} />
//         <button type="submit">Submit</button>
//       </form>
//       </div>
//     </>
//   );
// }



// 'use client';

// import { useChat } from '@ai-sdk/react';

// export default function Page() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat({});

//   return (
//     <>
//       {messages.map(message => (
//         <div key={message.id}>
//           {message.role === 'user' ? 'User: ' : 'AI: '}
//           {message.content}
//         </div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <input name="prompt" value={input} onChange={handleInputChange} />
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }