import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, EyeOff, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../services/api';
import { formatDate } from '../utils/date';
import DocumentCard from '../components/ui/DocumentCard';
import AIResult from '../components/ui/AIResult';

const History = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documentDetails, setDocumentDetails] = useState(null);
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await api.get('/documents/history');
            setDocuments(response.data);
        } catch (err) {
            setError('Failed to load document history');
        } finally {
            setLoading(false);
        }
    };

    const fetchDocumentDetails = async (docId) => {
        try {
            const response = await api.get(`/documents/${docId}`);
            setDocumentDetails(response.data);
        } catch (err) {
            setError('Failed to load document details');
        }
    };

    const handleAnalyze = async (docId) => {
        setAnalysisLoading(true);
        try {
            await api.post(`/analyze/${docId}`);
            // Refresh document details to get updated AI explanation
            await fetchDocumentDetails(docId);
        } catch (err) {
            setError('Analysis failed: ' + (err.response?.data?.detail || 'Unknown error'));
        } finally {
            setAnalysisLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Document History</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Review your past medical report uploads and AI explanations
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

            {selectedDocument ? (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                {selectedDocument.filename}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Uploaded on {formatDate(selectedDocument.uploaded_at)}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedDocument(null)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <EyeOff className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="p-6">
                        {documentDetails && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Document Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Document Type</p>
                                            <p className="text-gray-900 font-medium">
                                                {selectedDocument.document_type === 'pdf' ? 'PDF Report' : 'Image Scan'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <p className="text-gray-900 font-medium">
                                                {documentDetails.has_parsed_text ? '✓ Parsed' : 'Processing...'}
                                            </p>
                                        </div>
                                        {documentDetails.parsed_text_summary && (
                                            <div className="md:col-span-2">
                                                <p className="text-sm text-gray-500">Extracted Text Summary</p>
                                                <p className="text-gray-700 mt-1">{documentDetails.parsed_text_summary}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {documentDetails.has_parsed_text && (
                                    <div className="flex justify-end">
                                        {!documentDetails.has_ai_explanation && (
                                            <button
                                                onClick={() => handleAnalyze(selectedDocument.id)}
                                                disabled={analysisLoading}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                            >
                                                {analysisLoading ? (
                                                    <>
                                                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                                        Analyzing...
                                                    </>
                                                ) : (
                                                    'Generate AI Explanation'
                                                )}
                                            </button>
                                        )}
                                    </div>
                                )}

                                {documentDetails.has_ai_explanation && (
                                    <AIResult
                                        explanation={documentDetails.ai_explanation}
                                        parsedText={documentDetails.parsed_text}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Your Document History</h2>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                            </div>
                        ) : documents.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                                <p>You haven't uploaded any documents yet</p>
                                <Link
                                    to="/dashboard"
                                    className="mt-2 inline-block text-blue-600 hover:text-blue-800"
                                >
                                    Upload your first document
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {documents.map((doc) => (
                                    <DocumentCard
                                        key={doc.id}
                                        document={doc}
                                        onView={(document) => {
                                            setSelectedDocument(document);
                                            fetchDocumentDetails(document.id);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
