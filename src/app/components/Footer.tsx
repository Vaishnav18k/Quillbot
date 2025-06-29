'use client'
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="text-center bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to improve your writing?</h2>
      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-8 max-w-md sm:max-w-xl mx-auto">
        Join thousands of writers who trust QuillBot Lite for their paraphrasing needs.
      </p>
      <Link
        href="/paraphraser"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-primary/90 h-10 sm:h-11 rounded-md text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
      >
        Get Started Now
      </Link>
    </div>
  );
}