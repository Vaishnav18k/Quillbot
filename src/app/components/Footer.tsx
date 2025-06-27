'use client'
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="text-center bg-white rounded-2xl p-12 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to improve your writing?</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        Join thousands of writers who trust QuillBot Lite for their paraphrasing needs.
      </p>
      <Link
        href="/paraphraser"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md text-lg px-8 py-6"
      >
        Get Started Now
      </Link>
    </div>
  );
}