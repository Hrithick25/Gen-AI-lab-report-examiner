import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <span className="ml-3 text-xl font-bold text-gray-900">AI Medical Report Examiner</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user && (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/history"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    History
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    <LogOut className="h-4 w-4 mr-1" />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
