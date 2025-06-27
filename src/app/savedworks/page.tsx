'use client'
import React from 'react'
import Header from '../components/Header'
export default function SavedWorks() {
  const [saved, setSaved] = React.useState<any[]>([]);

  React.useEffect(() => {
    const collection = JSON.parse(localStorage.getItem('paraphrasedCollection') || '[]');
    setSaved(collection);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem('paraphrasedCollection');
    setSaved([]);
  };

  const handleDelete = (timestamp: number) => {
    const filtered = saved.filter((item: any) => item.timestamp !== timestamp);
    localStorage.setItem('paraphrasedCollection', JSON.stringify(filtered));
    setSaved(filtered);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">Saved Works</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-base text-gray-700">{saved.length} saved work{saved.length !== 1 ? 's' : ''}</span>
            {saved.length > 0 && (
              <button onClick={handleClearAll} className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-red-600 transition">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Clear All
              </button>
            )}
          </div>
          {saved.length === 0 ? (
            <div className="text-gray-500 text-center">No saved paraphrased results yet.</div>
          ) : (
            <div className="flex flex-col gap-6">
              {saved.map((item: any, idx: number) => (
                <div key={item.timestamp || idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold capitalize text-blue-700">{item.style}</span>
                    <span className="text-xs text-gray-400">{item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}</span>
                    <div className="flex gap-2 ml-2">
                      <button onClick={() => handleCopy(item.paraphrased)} title="Copy" className="p-1 rounded hover:bg-gray-100">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                      </button>
                      <button onClick={() => handleDelete(item.timestamp)} title="Delete" className="p-1 rounded hover:bg-red-50">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-500"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-gray-700 font-semibold mb-1">Original Text</div>
                    <div className="bg-white border border-gray-200 rounded-md p-3 text-sm">{item.original}</div>
                  </div>
                  <div>
                    <div className="text-green-700 font-semibold mb-1">Paraphrased Text ({item.style?.toLowerCase()} style)</div>
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm">{item.paraphrased}</div>
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