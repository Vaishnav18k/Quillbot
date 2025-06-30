"use client";
import React from "react";
import Header from "../components/Header";
import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";

export default function Page() {
  const [localInput, setLocalInput] = React.useState("");
  const [lastInput, setLastInput] = React.useState("");
  const [animatedText, setAnimatedText] = React.useState("");
  const [style, setStyle] = React.useState("standard");
  const [saving, setSaving] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    append,
  } = useChat({});

  const latestAIMessage = messages
    .filter((m) => m.role === "assistant")
    .slice(-1)[0];

  // Typing animation effect
  React.useEffect(() => {
    if (!latestAIMessage?.content) return;

    let index = 0;
    const text = latestAIMessage.content;
    setAnimatedText("");

    const interval = setInterval(() => {
      setAnimatedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [latestAIMessage?.content]);

  const prevMessageId = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    if (latestAIMessage && latestAIMessage.id !== prevMessageId.current) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      prevMessageId.current = latestAIMessage.id;
    }
  }, [latestAIMessage]);

  const maxWords = 500;
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;

  React.useEffect(() => {
    setLocalInput(input);
  }, [input]);

  const handleResetInput = () => {
    setMessages([]);
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

    await append({ role: "user", content: `${stylePrompt}\n\n${localInput}` });
    setLastInput(localInput);
  };

  const router = useRouter();
  const saveCollection = useMutation(api.savedCollection.saveCollection);

  const handleSave = async () => {
    if (!latestAIMessage) return;
    setSaving(true);
    await saveCollection({
      original: lastInput,
      paraphrased: latestAIMessage.content,
      style,
      timestamp: Date.now(),
    });
    setSaving(false);
  };

  const handleCopy = () => {
    if (!latestAIMessage) return;
    navigator.clipboard.writeText(latestAIMessage.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold mb-1 flex items-center gap-2">Original Text</h2>
          <p className="text-gray-600 mb-4 text-base">
            Enter the text you want to paraphrase (up to {maxWords} words)
          </p>
          <form onSubmit={onSubmit} className="flex flex-col gap-0">
            <textarea
              className="w-full min-h-[150px] rounded-md border px-3 py-2 text-sm mb-2 resize-none"
              placeholder="Enter your text here..."
              name="prompt"
              value={localInput}
              onChange={(e) => {
                setLocalInput(e.target.value);
                handleInputChange(e);
              }}
              maxLength={maxWords * 8}
            />
            <div className="flex items-center justify-between mb-2">
              <span className="bg-slate-100 p-3 py-2 rounded-full text-xs text-black font-medium">
                {wordCount}/{maxWords} words
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <select
                className="w-full rounded border border-gray-300 p-2 text-sm"
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
                disabled={
                  !input.trim() ||
                  wordCount > maxWords ||
                  status === "submitted" ||
                  status === "streaming"
                }
                className="inline-flex items-center gap-2 bg-black text-white rounded-md px-6 py-2 text-sm font-medium transition disabled:opacity-50"
              >
                {status === "submitted" || status === "streaming"
                  ? "Paraphrasing..."
                  : "Paraphrase"}
              </button>
              <button
                type="button"
                onClick={handleResetInput}
                className="inline-flex items-center gap-2 border border-gray-300 bg-white text-sm rounded-md px-4 py-2"
              >
                Reset
              </button>
            </div>
            <div className="text-sm font-semibold text-blue-900 bg-blue-50 rounded px-3 py-2 mb-1">
              <span className="font-bold">{styleOptions.find((opt) => opt.value === style)?.label} Style:</span>{" "}
              <span className="font-normal">{styleOptions.find((opt) => opt.value === style)?.desc}</span>
            </div>
          </form>
          {status === "error" && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              An error occurred. Please try again.
            </div>
          )}
        </div>

        {latestAIMessage?.content && lastInput && (
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 border border-gray-100 mt-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-2xl font-bold">Paraphrased Result</h3>
              <div className="inline-flex items-center rounded-full bg-black text-white px-3 py-1 text-xs font-semibold capitalize">
                {style}
              </div>
            </div>
            <div className="text-gray-500 text-sm mb-3 text-center">
              Your text has been rewritten using the{" "}
              <span className="font-semibold">{style}</span> style
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-slate-200 mb-4">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {animatedText}
              </p>
            </div>
            <div className="flex gap-4 mb-4 justify-center">
              <button
                className="flex-1 border border-slate-200 bg-white rounded-lg px-6 py-3 text-base font-semibold hover:bg-gray-50"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saved!" : "Save to Collection"}
              </button>
              <button
                className="flex-1 border border-slate-200 bg-white rounded-lg px-6 py-3 text-base font-semibold hover:bg-gray-50"
                onClick={handleCopy}
                disabled={copied}
              >
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>
          </div>
        )}

        {showToast && (
          <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 shadow-lg rounded-lg p-5 min-w-[320px] max-w-xs">
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
