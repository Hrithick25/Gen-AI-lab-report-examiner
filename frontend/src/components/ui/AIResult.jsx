import React from 'react';
import Disclaimer from './Disclaimer';

const AIResult = ({ explanation, parsedText }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">AI Explanation</h3>
            </div>
            <div className="p-4">
                <Disclaimer />
                <div className="prose max-w-none">
                    {explanation ? (
                        <div
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br>') }}
                        />
                    ) : (
                        <p className="text-gray-500 italic">No AI explanation available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIResult;
