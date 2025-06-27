'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useRouter } from 'next/navigation';
export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
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
              className="h-8 w-8 text-primary"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            <span className="font-bold text-lg text-primary">QuillBot Lite</span>
          </Link>
          <nav className="flex items-center space-x-6">
            {/* Home */}
            <Link href="/" className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium ${pathname === '/' ? 'bg-[#181F2A] text-white' : 'text-[#181F2A] hover:bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 21V9h6v12" />
              </svg>
              Home
            </Link>
            {/* Paraphraser */}
            <Link href="/paraphraser" className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium ${pathname === '/paraphraser' ? 'bg-[#181F2A] text-white' : 'text-[#181F2A] hover:bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Paraphraser
            </Link>
            {/* Saved Works */}
            <Link href="/savedworks" className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium ${pathname === '/savedworks' ? 'bg-[#181F2A] text-white' : 'text-[#181F2A] hover:bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Saved Works
            </Link>
           
          </nav>
        </div>
      </div>
    </header>
  );
}