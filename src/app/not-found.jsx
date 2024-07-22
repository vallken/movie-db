'use client'; // This is a client component 👈🏽

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <main className="text-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold text-gray-600 mb-8">
          Oops! Page not found
        </p>
        <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
          We're sorry, but the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Go to Homepage
          </Link>
          <button onClick={() => window.history.back()} className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
            Go Back
          </button>
        </div>
      </main>

      <footer className="mt-auto py-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
}