import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, User, History, AlertTriangle, FileType, FileImage, ChevronRight } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import UploadSection from '../components/upload/UploadSection';
import ConsoleOutput from '../components/ConsoleOutput';


const Dashboard = () => {
    const { user } = useAuth();
    const [pdfLoading, setPdfLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [error, setError] = useState('');
    const [aiResult, setAiResult] = useState(null);
    const [logs, setLogs] = useState([]);

    const addLog = (message, type = 'info') => {
        setLogs(prev => [...prev, { message, type }]);
    };


    const handleFileUpload = async (file, type) => {
        const loadingSetter = type === 'pdf' ? setPdfLoading : setImageLoading;
        loadingSetter(true);
        setError('');
        setAiResult(null);
        setLogs([]); // Clear previous logs
        addLog(`Starting upload for ${file.name}...`, 'cmd');

        try {
            if (type !== 'pdf') {
                throw new Error('Only PDF reports are supported for analysis right now.');
            }

            addLog('File type verified as PDF.');
            const formData = new FormData();
            formData.append('file', file);

            addLog('Sending file to backend for analysis...');
            // Post to backend endpoint; CRA proxy will forward to 127.0.0.1:8000
            const response = await api.post('/explain-report', formData);

            addLog('Response received from backend.');
            addLog('Parsing analysis result...', 'cmd');

            setUploadSuccess({
                id: `${Date.now()}`,
                filename: file.name,
                type: type,
                timestamp: new Date().toISOString(),
            });

            const explanation = response.data?.explanation || '';
            setAiResult({
                explanation: explanation,
                disclaimer: response.data?.disclaimer || '',
            });

            addLog('Analysis complete.');
            addLog(`Result: ${explanation.substring(0, 100)}...`);

            setTimeout(() => setUploadSuccess(null), 5000);
        } catch (err) {
            const message = err.response?.data?.detail || err.message || 'Upload failed';
            setError(message);
            addLog(`Error: ${message}`, 'error');
        } finally {
            loadingSetter(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || 'User'}</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Upload your medical reports to get AI-powered explanations
                </p>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <p className="ml-3 text-sm text-red-700">{error}</p>
                    </div>
                </div>
            )}

            {uploadSuccess && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex">
                        <FileText className="h-5 w-5 text-green-400" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                                {uploadSuccess.filename} uploaded successfully!
                            </p>
                            <p className="text-sm text-green-700">
                                Document ID: {uploadSuccess.id} | Ready for analysis
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UploadSection
                    title="Upload PDF Lab Report"
                    icon={FileType}
                    fileTypes={['application/pdf']}
                    onUpload={(file) => handleFileUpload(file, 'pdf')}
                    loading={pdfLoading}
                />
                <UploadSection
                    title="Upload Image Scan"
                    icon={FileImage}
                    fileTypes={['image/jpeg', 'image/png', 'image/jpg']}
                    onUpload={(file) => handleFileUpload(file, 'image')}
                    loading={imageLoading}
                />
            </div>

            <ConsoleOutput logs={logs} title="Analysis Console" />

            {aiResult && (
                <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900">AI Explanation</h3>
                    <pre className="mt-3 whitespace-pre-wrap text-gray-800 text-sm">{aiResult.explanation}</pre>
                    {aiResult.disclaimer && (
                        <p className="mt-4 text-xs text-gray-500">{aiResult.disclaimer}</p>
                    )}
                </div>
            )}

            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                    <Link
                        to="/history"
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                    >
                        View all history <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/history"
                        className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                    >
                        <History className="h-8 w-8 text-blue-600 mx-auto" />
                        <h3 className="mt-2 font-medium text-gray-900">Document History</h3>
                        <p className="mt-1 text-sm text-gray-500">View past uploads</p>
                    </Link>
                    <Link
                        to="/profile"
                        className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                    >
                        <User className="h-8 w-8 text-green-600 mx-auto" />
                        <h3 className="mt-2 font-medium text-gray-900">Your Profile</h3>
                        <p className="mt-1 text-sm text-gray-500">Update medical info</p>
                    </Link>
                    <div
                        className="bg-white border border-gray-200 rounded-lg p-4 text-center cursor-not-allowed opacity-60"
                    >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                        <h3 className="mt-2 font-medium text-gray-500">Batch Upload</h3>
                        <p className="mt-1 text-sm text-gray-400">Coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
