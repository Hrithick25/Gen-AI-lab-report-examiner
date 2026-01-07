import React from 'react';
import { ChevronRight } from 'lucide-react';
import { formatDate } from '../../utils/date';

const DocumentCard = ({ document, onView }) => {
    const displayDate = formatDate(document.uploaded_at, {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium text-gray-900">
                        {document.filename || 'Medical Report'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {document.document_type === 'pdf' ? 'PDF Report' : 'Image Scan'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Uploaded: {displayDate}
                    </p>
                </div>
                <button
                    onClick={() => onView(document)}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                >
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {document.has_parsed_text && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Parsed
                    </span>
                )}
                {document.has_ai_explanation && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        AI Analyzed
                    </span>
                )}
            </div>
        </div>
    );
};

export default DocumentCard;
