'use client'
import Link from 'next/link';

export default function Hero() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-slate-500/10 rounded-full">
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
                  className="h-16 w-16 text-primary"
                >
                  <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
                  <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
                  <path d="m2.3 2.3 7.286 7.286"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Rewrite with <span className="text-primary">Confidence</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your writing with our intelligent paraphrasing tool. Choose from multiple rewriting styles to match your tone and purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/paraphraser"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-primary/90 h-11 rounded-md text-lg px-8 py-6"
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
                  className="mr-2 h-5 w-5"
                >
                  <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
                  <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
                  <path d="m2.3 2.3 7.286 7.286"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
                Start Paraphrasing
              </Link>
              <Link
                href="/savedworks"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md text-lg px-8 py-6"
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
                  className="mr-2 h-5 w-5"
                >
                  <path d="M12 7v14"></path>
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                </svg>
                View Saved Works
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-0">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
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
                      className="h-8 w-8 text-blue-600"
                    >
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold tracking-tight text-xl">Multiple Styles</h3>
                <p className="text-sm text-muted-foreground">Choose from Standard, Formal,or Creative rewriting styles</p>
              </div>
              <div className="p-6 pt-0">
                <p className="text-gray-600">Adapt your content for different audiences and purposes with our specialized rewriting modes.</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
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
                      className="h-8 w-8 text-green-600"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold tracking-tight text-xl">Privacy First</h3>
                <p className="text-sm text-muted-foreground">All processing happens locally in your browser</p>
              </div>
              <div className="p-6 pt-5">
                <p className="text-gray-600">Your text never leaves your device. Enjoy complete privacy and work offline.</p>
              </div>
            </div>
            <div className="rounded-lg border border-slate-400 bg-card text-card-foreground shadow-sm text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
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
                      className="h-8 w-8 text-purple-600"
                    >
                      <path d="M12 7v14"></path>
                      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold tracking-tight text-xl">Save & Organize</h3>
                <p className="text-sm text-muted-foreground">Keep track of your paraphrased content</p>
              </div>
              <div className="p-6 pt-5">
                <p className="text-gray-600">Save your best rewrites and access them anytime for future reference.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }