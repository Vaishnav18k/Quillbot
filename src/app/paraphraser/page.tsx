"use client";
import React from "react";
import Header from "../components/Header";
import { useCompletion } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Content } from "openai/resources/containers/files.js";
import { Completion } from "openai/resources.js";


export default function Page() {
  const [localInput, setLocalInput] = React.useState("");
  const [lastInput, setLastInput] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [style, setStyle] = React.useState("standard");
  const maxWords = 500;
  const wordCount = localInput.trim().split(/\s+/).filter(Boolean).length;

  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    
  } = useCompletion({
    api: "/api/completion",
    // Throttle the completion and data updates to 50ms:
    experimental_throttle: 10,

    headers: {
      Authorization: 'your_token',
    },
    body: {
      user_id: '123',
    },
    credentials: 'same-origin',
  
    // Event callbacks for debugging
    onResponse: (response: Response) => {
      console.log('Received response from server:', response)
    },
    onFinish: (prompt: string, completion: string) => {
      console.log('Finished streaming message:', completion);
      // console.log('Result:', message.text); // or message.result, depending on API
    },
    onError: (error: Error) => {
      console.error('An error occurred:', error)
    },
    
  });

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  

  // Sync input state on every change
  React.useEffect(() => {
    setLocalInput(input);
  }, [input]);
  

  const styleOptions = [
    {
      value: "standard",
      label: "Standard",
      desc: "Clear and natural rewriting with synonym replacement",
    },
    {
      value: "formal",
      label: "Formal",
      desc: "Professional tone suitable for academic or business writing",
    },
    {
      value: "creative",
      label: "Creative",
      desc: "Expressive and engaging style with vivid language",
    },
  ];

  const router = useRouter();
  const saveCollection = useMutation(api.savedCollection.saveCollection);

  const handleResetInput = () => {
    setLocalInput("");
    setLastInput("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || wordCount > maxWords) return;

    const stylePrompt =
      style === "standard"
        ? "Paraphrase the following text in a clear and neutral tone."
        : style === "formal"
        ? "Paraphrase the following text in a professional and academic tone."
        : "Paraphrase the following text in an expressive and engaging style with vivid language.";

    // manually update input to include style prompt
    // Create a synthetic event with the expected target shape
    const syntheticEvent = {
      target: { value: `${stylePrompt}\n\n${localInput}` }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(syntheticEvent);

    await handleSubmit(e);
    setLastInput(localInput);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleSave = async () => {
    if (!completion) return;
    setSaving(true);
    await saveCollection({
      original: lastInput,
      paraphrased: completion,
      style: style,
      timestamp: Date.now(),
    });
    setSaving(false);
  };

  const handleCopy = () => {
    if (!completion) return;
    navigator.clipboard.writeText(completion);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center ">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary"
            >
              <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
              <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
              <path d="m2.3 2.3 7.286 7.286"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
            Original Text
          </h2>
          <p className="text-gray-600 mb-4 text-base">
            Enter the text you want to paraphrase (up to {maxWords} words)
          </p>
          <form onSubmit={onSubmit} className="flex flex-col gap-0">
            <textarea
               className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none mb-2"
               placeholder="Enter your text here..."
               name="prompt"
               onChange={(e) => setLocalInput(e.target.value)}
              //  value={localInput}
               maxLength={maxWords * 8}
             />
            <div className="flex items-center justify-between mb-2">
              <span className=" bg-slate-100 p-3 py-2  rounded-full text-xs text-black font-medium">
                {wordCount}/{maxWords} words
              </span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400" onClick={stop} disabled={!isLoading}>Stop</button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <select
                className="w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                {styleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}...
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={!localInput.trim() || wordCount > maxWords || isLoading}
                className="inline-flex items-center justify-center gap-2 font-medium bg-black text-white hover:bg-primary/90 rounded-md px-6 py-2 transition disabled:opacity-50 disabled:pointer-events-none"
              >
                {/* svg of the penicon removed here */}

                {/* {isLoading ? <Spinner /> : "Paraphrase"} */}
                {/* testing the loading and error state */}
                {isLoading ? (
  <>
    <Spinner /> Paraphrasing...
  </>
) : (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
      <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
      <path d="m2.3 2.3 7.286 7.286"></path>
      <circle cx="11" cy="11" r="2"></circle>
    </svg>
    Paraphrase
  </>
)}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-300 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={handleResetInput}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rotate-ccw h-4 w-4"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>
            </div>
            <div className="text-sm font-semibold text-blue-900 bg-blue-50 rounded px-3 py-2 mb-1">
              <span className="font-bold">
                {styleOptions.find((opt) => opt.value === style)?.label} Style:
              </span>{" "}
              <span className="font-normal">
                {styleOptions.find((opt) => opt.value === style)?.desc || ""}
              </span>
            </div>
        
          </form>
          

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              Error: {error.message}
              {/* it should show error message */}
            </div>
          )}
        </div>
<br></br>
        {completion && lastInput && (
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
            <div className="mt-8">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-bold">Paraphrased Result</h3>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-black text-white capitalize">
                  {style}
                </div>
              </div>
              <div className="text-gray-500 text-sm mb-3 text-center">
                Your text has been rewritten using the{" "}
                <span className="font-semibold ">{style}</span> style
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-slate-200 mb-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {completion}
                </p>
              </div>
              <div className="flex gap-4 mb-4 justify-center">
                <button
                  className="flex-1 flex justify-center items-center gap-2 border border-slate-200 bg-white text-sm shadow-sm rounded-lg px-6 py-4 font-semibold text-base text-gray-900 hover:border-primary hover:bg-gray-50 hover:text-primary transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
                  onClick={handleSave}
                  disabled={saving}
                ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-save mr-2 h-4 w-4"
              >
                <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
                <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
              </svg>


                  {saving ? "Saved!" : "Save to Collection"}
                </button>
                <button
                  className="flex-1 flex justify-center items-center gap-2 border border-slate-200 bg-white text-sm shadow-sm rounded-lg px-6 py-4 font-semibold text-base text-gray-900 hover:border-primary hover:bg-gray-50 hover:text-primary transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-copy mr-2 h-4 w-4"
                  
                  >
                    <rect
                      width="14"
                      height="14"
                      x="8"
                      y="8"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </svg>
                  {copied ? "Copied!" : "Copy Result"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 shadow-lg rounded-lg p-5 flex flex-col gap-1 min-w-[320px] max-w-xs animate-fade-in">
            <div className="font-bold text-gray-900 mb-1 flex items-center justify-between">
              Text paraphrased successfully!
              <button
                onClick={() => setShowToast(false)}
                className="ml-2 text-gray-400 hover:text-gray-600 text-lg"
              >
                &times;
              </button>
            </div>
            <div className="text-gray-700 text-sm">
              Rewritten in <span className="font-semibold">{style}</span> style.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
