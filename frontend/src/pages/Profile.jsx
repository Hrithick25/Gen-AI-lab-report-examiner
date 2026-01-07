import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

const Profile = () => {
    const { user, refreshProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        conditions: '',
        allergies: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                age: user.age || '',
                gender: user.gender || '',
                conditions: user.conditions || '',
                allergies: user.allergies || '',
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const data = {
                name: formData.name,
                age: formData.age ? parseInt(formData.age) : undefined,
                gender: formData.gender || null,
                conditions: formData.conditions || null,
                allergies: formData.allergies || null,
            };

            await api.put('/user/profile', data);
            await refreshProfile();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Manage your personal and medical information
                </p>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                </div>
                <div className="p-6">
                    {error && (
                        <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md text-sm">
                            Profile updated successfully!
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                        Age
                                    </label>
                                    <input
                                        id="age"
                                        name="age"
                                        type="number"
                                        min="1"
                                        max="120"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer_not_to_say">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="conditions" className="block text-sm font-medium text-gray-700">
                                    Known Medical Conditions (Optional)
                                </label>
                                <textarea
                                    id="conditions"
                                    name="conditions"
                                    rows={2}
                                    value={formData.conditions}
                                    onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Hypertension, Diabetes Type 2"
                                />
                            </div>
                            <div>
                                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                                    Allergies (Optional)
                                </label>
                                <textarea
                                    id="allergies"
                                    name="allergies"
                                    rows={2}
                                    value={formData.allergies}
                                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Penicillin, Peanuts"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Documents</h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Your Upload History</h3>
                    </div>
                    <div className="p-6">
                        <div className="text-center py-8 text-gray-500">
                            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                            <p>No documents uploaded yet</p>
                            <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 mt-2 block">
                                Upload your first document
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
