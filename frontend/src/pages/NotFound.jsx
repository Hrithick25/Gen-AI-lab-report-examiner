import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
                Go back home
            </Link>
        </div>
    );
};

export default NotFound;
