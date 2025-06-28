"use client";
import React from "react";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface SavedItem {
  _id: Id<"savedCollection">;
  timestamp: number;
  style: string;
  original: string;
  paraphrased: string;
}

export default function SavedWorks() {
  // Convex hooks
  const saved = useQuery(api.savedCollection.getAll, {});
  const deleteAll = useMutation(api.savedCollection.deleteAll);
  const deleteById = useMutation(api.savedCollection.deleteById);

  // State for toast
  const [showToast, setShowToast] = React.useState(false);
  const [pendingDelete, setPendingDelete] = React.useState<null | string>(null);

  // Function to clear all saved items
  const clearAll = async () => {
    await deleteAll({});
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  // Function to handle the "Clear All" action with a confirmation toast
  const handleClearAll = () => {
    if (toast.isActive("confirm-clear-all")) return; // Prevent multiple toasts
    toast(
      ({ closeToast }) => <ConfirmClearAll onConfirm={clearAll} closeToast={closeToast} />,
      {
        toastId: "confirm-clear-all",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: 'bottom-center',
        closeButton: false,
        hideProgressBar: true, // Cleaner UI for confirmation
      }
    );
  };

  // Function to delete an individual item by id
  const handleDelete = async (id: string) => {
    setPendingDelete(id);
    // await deleteById({ id });
    await deleteById({ id: id as Id<"savedCollection"> });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
    setPendingDelete(null);
  };

  // Function to copy text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Custom confirmation toast component (modal style)
  const ConfirmClearAll = ({ closeToast, onConfirm }: { closeToast: () => void; onConfirm: () => void }) => (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-all-title"
      className="bg-white text-gray-700 p-6 rounded-lg shadow-xl max-w-md mx-auto"
    >
      <h2 id="clear-all-title" className="text-xl font-bold mb-2 text-gray-900">Clear all saved works?</h2>
      <p className="text-sm mb-4 text-gray-600">This action cannot be undone. All your saved paraphrases will be permanently deleted.</p>
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={closeToast}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            closeToast();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Clear All
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <ToastContainer />
      {/* Paraphrased Deleted Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 shadow-lg rounded-lg p-5 flex flex-col gap-1 min-w-[320px] max-w-xs animate-fade-in">
          <div className="font-bold text-gray-900 mb-1 flex items-center justify-between">
            Text Deleted successfully!
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-gray-400 hover:text-gray-600 text-lg"
            >
              &times;
            </button>
          </div>
          <div className="text-gray-700 text-sm">
            The paraphrased text has been removed from your collection.
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Saved Works</h1>
            <p className="text-lg text-gray-600">Your collection of paraphrased content</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            {saved && saved.length > 0 && (
              <button
                onClick={handleClearAll}
                className="bg-red-500 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white hover:bg-destructive/90 h-9 rounded-md px-3"
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
                  className="lucide lucide-trash2 mr-2 h-4 w-4"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Saved Works List */}
        <div className="space-y-6 w-full p-2">
          {saved && saved.length === 0 ? (
            <div className=" bg-white border border-slate-100 rounded-md items-center justify-center p-2 w-auto"> 
              <div className="flex flex-col items-center justify-center py-24 w-full">
                <div className="mb-6">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" className="mx-auto text-gray-300"><rect x="3" y="3" width="18" height="18" rx="4" fill="#f3f4f6"/><path d="M8 10h8M8 14h6" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/><rect x="7" y="7" width="10" height="10" rx="2" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/></svg>
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">No saved works yet</h2>
                <p className="text-gray-500 mb-6 text-lg">Start paraphrasing text and save your results to build your collection.</p>
                <a href="/paraphraser" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-lg font-semibold rounded-lg shadow hover:bg-gray-700 transition">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 13h4"/></svg>
                  Start Paraphrasing
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {saved?.map((item: SavedItem) => (
                <div
                  key={item._id} // Assuming _id is unique
                  className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-gray-100 text-gray-800">
                          {item.style}
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
                            className="lucide lucide-calendar mr-1 h-4 w-4"
                          >
                            <path d="M8 2v4" />
                            <path d="M16 2v4" />
                            <rect width="18" height="18" x="3" y="4" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                          {item.timestamp
                            ? new Date(item.timestamp).toLocaleString()
                            : ""}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCopy(item.paraphrased)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                          title="Copy paraphrased text"
                          aria-label="Copy paraphrased text" // Added for accessibility
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
                            className="lucide lucide-copy h-4 w-4"
                          >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 ${pendingDelete === item._id ? 'opacity-50 pointer-events-none' : ''}`}
                          title="Delete"
                          aria-label="Delete saved work" // Added for accessibility
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
                            className="lucide lucide-trash2 h-4 w-4 text-red-500"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                      <div>
                        <h3 className="tracking-tight text-sm font-medium text-gray-700 mb-2">Original Text</h3>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-800 text-sm leading-relaxed">{item.original}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="tracking-tight text-sm font-medium text-gray-700 mb-2">Paraphrased Text ({item.style} style)</h3>
                        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-gray-800 text-sm leading-relaxed">{item.paraphrased}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}