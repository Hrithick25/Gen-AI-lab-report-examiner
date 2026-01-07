import React from 'react';

const OutputConsole = ({ title, logs = [], loading, onClear }) => {
    return (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        disabled={loading || logs.length === 0}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="px-4 py-3">
                <div className="h-64 overflow-auto bg-gray-50 rounded p-3 text-sm text-gray-800 whitespace-pre-wrap">
                    {logs.length === 0 && !loading && (
                        <p className="text-gray-500">No output yet. Upload a report to see the explanation.</p>
                    )}
                    {logs.map((item, idx) => (
                        <div key={idx} className="mb-4">
                            <div className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</div>
                            <div className="mt-1">{item.text}</div>
                            {item.disclaimer && (
                                <div className="mt-2 text-xs text-gray-500">{item.disclaimer}</div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            Processing...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OutputConsole;
