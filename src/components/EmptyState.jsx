import React from 'react';
import Link from 'next/link';

const EmptyState = ({ 
  message = "No data found", 
  description = "We couldn't find any data matching your request.",
  icon = "🔍",
  actionText = "Go back to homepage",
  actionLink = "/"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">
          {message}
        </h2>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          {description}
        </p>
        <Link 
          href={actionLink}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {actionText}
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;