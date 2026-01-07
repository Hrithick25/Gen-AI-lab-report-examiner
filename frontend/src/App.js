import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/ui/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import History from './pages/History';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <AuthProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/history"
                                element={
                                    <ProtectedRoute>
                                        <History />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/"
                                // Basic check for redirect, but ProtectedRoute handles inner logic nicely too.
                                // Keeping original logic style:
                                element={<Navigate to={token ? '/dashboard' : '/login'} replace />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
